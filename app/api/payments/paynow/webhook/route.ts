import { NextResponse } from "next/server";
import { getConvexServerClient } from "@/lib/convex-server";
import {
  PaynowWebhookPayload,
  verifyPaynowWebhook,
} from "@/lib/paynow";

export async function POST(request: Request) {
  const rawPayload = await request.text();
  let webhook: PaynowWebhookPayload;
  try {
    webhook = JSON.parse(rawPayload);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload from Paynow.", details: error?.message },
      { status: 400 },
    );
  }

  const signature =
    request.headers.get("x-paynow-signature") ?? webhook.signature ?? null;
  if (!verifyPaynowWebhook(webhook, signature)) {
    return NextResponse.json({ error: "Signature mismatch." }, { status: 400 });
  }

  if (webhook.status !== "paid") {
    return NextResponse.json({
      result: "ignored",
      reason: "Only paid notifications update plans.",
    });
  }

  let metadata: Record<string, any> = {};
  try {
    metadata = JSON.parse(webhook.metadata);
  } catch (err) {
    return NextResponse.json(
      { error: "Cannot parse metadata from payload.", details: err?.message },
      { status: 400 },
    );
  }

  const email =
    typeof metadata?.email === "string" ? metadata.email.trim() : undefined;
  if (!email) {
    return NextResponse.json(
      { error: "Webhook payload is missing customer email." },
      { status: 400 },
    );
  }

  const convex = getConvexServerClient();
  const user = await convex.query("functions/users:getUser", { email });
  if (!user) {
    return NextResponse.json(
      { error: "User not found for webhook payload.", email },
      { status: 404 },
    );
  }

  await convex.mutation("functions/users:setPlan", {
    userId: user._id,
    plan: typeof metadata?.plan === "string" ? metadata.plan : "pro",
    stripeCustomerId: typeof metadata?.stripeCustomerId === "string"
      ? metadata.stripeCustomerId
      : undefined,
    stripePriceId: typeof metadata?.stripePriceId === "string"
      ? metadata.stripePriceId
      : undefined,
  });

  return NextResponse.json({
    result: "success",
    reference: webhook.reference,
    email,
  });
}
