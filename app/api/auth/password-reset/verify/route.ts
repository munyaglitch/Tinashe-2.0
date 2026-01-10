import { NextResponse } from "next/server"
import { getConvexServerClient } from "@/lib/convex-server"

export async function POST(request: Request) {
  const { email, code } = await request.json().catch(() => ({}))
  if (!email || !code || typeof email !== "string" || typeof code !== "string") {
    return NextResponse.json(
      { success: false, error: "Email and code are required" },
      { status: 400 },
    )
  }
  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { success: false, error: "Code must be a 6 digit number" },
      { status: 400 },
    )
  }
  const normalizedEmail = email.trim().toLowerCase()
  const convex = getConvexServerClient()
  const isValid = await convex.mutation("functions/auth:consumePasswordResetCode", {
    email: normalizedEmail,
    code,
  })
  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Code expired or invalid" },
      { status: 400 },
    )
  }
  return NextResponse.json({ success: true })
}
