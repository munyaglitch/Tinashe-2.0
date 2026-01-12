import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const APPROVER_EMAIL = "tinashechikwaiti@gmail.com";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  if (!payload?.listing) {
    return NextResponse.json({ success: false, error: "Missing listing data" }, { status: 400 });
  }

  const { listing } = payload;
  const bodyText = `
    New listing submitted by ${listing.userName} (${listing.userEmail})
    Price: ${listing.price}
    Details: ${listing.details}
    Listing ID: ${listing.id}
  `;

  await sendEmail({
    to: APPROVER_EMAIL,
    subject: "New listing awaiting approval",
    text: bodyText,
    html: `<p>${bodyText.replace(/\n/g, "<br />")}</p>`,
  });

  return NextResponse.json({ success: true });
}
