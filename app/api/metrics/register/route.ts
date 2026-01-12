import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

const ADMIN_RECEIVERS = [
  "tinashechikwaiti@gmail.com",
  "mlscalez.z@gmail.com",
]

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}))
  const name = typeof payload?.name === "string" ? payload.name : "New User"
  const email = typeof payload?.email === "string" ? payload.email : "unknown"

  const subject = "New user registration alert"
  const text = `New user registered:\n\nName: ${name}\nEmail: ${email}`
  const html = `<p>New user registered:</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`

  for (const to of ADMIN_RECEIVERS) {
    await sendEmail({
      to,
      subject,
      text,
      html,
    })
  }

  return NextResponse.json({ success: true })
}
