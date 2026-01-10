import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  const { type, userData } = await request.json().catch(() => ({}))
  if (!type || !userData?.email) {
    return NextResponse.json(
      { success: false, error: "Missing type or email" },
      { status: 400 },
    )
  }

  const to = userData.email
  let payload = {
    subject: "Notification from Tinashe Car Sales",
    text: `Hello ${userData.name || ""}, you have a new notification from Tinashe Car Sales.`,
    html: `<p>Hello ${userData.name || ""},</p><p>You have a new notification from Tinashe Car Sales.</p>`,
  }

  switch (type) {
    case "signin":
      payload = {
        subject: "Sign-in successful",
        text: `Hi ${userData.name || "there"}, you signed in successfully.`,
        html: `<p>Hi ${userData.name || "there"},</p><p>Your sign-in was successful.</p>`,
      }
      break
    case "subscribe":
      payload = {
        subject: "Subscription confirmed",
        text: `Thanks ${userData.name || ""}, we received ${userData.amount}.`,
        html: `<p>Hi ${userData.name || ""},</p><p>Thanks for subscribing. We've received ${userData.amount}.</p>`,
      }
      break
    case "password_reset":
      payload = {
        subject: "Your password reset code",
        text: `Your password reset code is ${userData.code}.`,
        html: `<p>Your password reset code is <strong>${userData.code}</strong>.</p><p>This code expires shortly.</p>`,
      }
      break
  }

  const result = await sendEmail({
    to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  })

  const log = {
    ...result.log,
    type,
  }
  return NextResponse.json({ success: result.success, log })
}
