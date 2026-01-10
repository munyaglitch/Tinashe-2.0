import { mutationGeneric } from "convex/server"
import { v } from "convex/values"

export const storePasswordResetCode = mutationGeneric({
  args: {
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
  },
  handler: async ({ db }, { email, code, expiresAt }) => {
    await db.insert("password_resets", {
      email,
      code,
      expiresAt,
      used: false,
      createdAt: Date.now(),
    })
    return true
  },
})

export const consumePasswordResetCode = mutationGeneric({
  args: {
    email: v.string(),
    code: v.string(),
  },
  handler: async ({ db }, { email, code }) => {
    const reset = await db
      .query("password_resets")
      .filter((q) => q.eq(q.field("email"), email))
      .filter((q) => q.eq(q.field("code"), code))
      .first()
    if (!reset || reset.used || reset.expiresAt < Date.now()) {
      return false
    }
    await db.patch("password_resets", reset._id, { used: true })
    return true
  },
})
