import { NextResponse } from "next/server"
import crypto from "crypto"
import { getConvexServerClient } from "@/lib/convex-server"
import { sendEmail } from "@/lib/email"

const CODE_LENGTH = 6
const EXPIRATION_MS = 1000 * 60 * 15

function createNumericCode() {
  const min = 10 ** (CODE_LENGTH - 1)
  const max = 10 ** CODE_LENGTH - 1
  return crypto.randomInt(min, max + 1).toString()
}

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}))
  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 },
    )
  }
  const normalizedEmail = email.trim().toLowerCase()
  const code = createNumericCode()
  const expiresAt = Date.now() + EXPIRATION_MS

  const convex = getConvexServerClient()
  await convex.mutation("functions/auth:storePasswordResetCode", {
    email: normalizedEmail,
    code,
    expiresAt,
  })

  await sendEmail({
    to: normalizedEmail,
    subject: "Your Tinashe Car Sales reset code",
    text: `Your password reset code is ${code}. It expires shortly.`,
    html: `<p>Your password reset code is <strong>${code}</strong>. It expires in 15 minutes.</p>`,
  })

  return NextResponse.json({
    success: true,
    codeLength: CODE_LENGTH,
    expiresAt,
    email: normalizedEmail,
  })
}
