import { NextResponse } from "next/server";
import { createPaynowSession } from "@/lib/paynow";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const email =
    typeof payload?.email === "string" ? payload.email.trim() : "";
  if (!email) {
    return NextResponse.json(
      { error: "A valid email is required to start payment." },
      { status: 400 },
    );
  }

  const session = createPaynowSession({
    email,
    method: "card",
    plan: typeof payload?.plan === "string" ? payload.plan : "pro",
  });
  return NextResponse.json(session);
}
