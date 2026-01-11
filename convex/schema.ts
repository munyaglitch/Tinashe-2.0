import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    plan: v.string(),
    profilePicture: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    bio: v.optional(v.union(v.string(), v.null())),
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("usersByEmail", ["email"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    plan: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("trialing"),
      v.literal("past_due"),
      v.literal("canceled"),
    ),
    stripeSubscriptionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    createdAt: v.number(),
    canceledAt: v.optional(v.number()),
    cancelReason: v.optional(v.string()),
    quantity: v.optional(v.number()),
  }).index("subscriptionsByUser", ["userId"]),

  password_resets: defineTable({
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
    used: v.boolean(),
    createdAt: v.number(),
  }).index("passwordResetsByEmail", ["email"]),
});
