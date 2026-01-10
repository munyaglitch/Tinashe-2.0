import { mutationGeneric } from "convex/server";
import { v } from "convex/values";

const DEFAULT_SUBSCRIPTION_STATUS = "active" as const;

export const createSubscription = mutationGeneric({
  args: {
    userId: v.id("users"),
    plan: v.string(),
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("trialing"),
        v.literal("past_due"),
        v.literal("canceled"),
      ),
    ),
    stripeSubscriptionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    quantity: v.optional(v.number()),
  },
  handler: async (
    { db },
    {
      userId,
      plan,
      status,
      stripeSubscriptionId,
      stripeCustomerId,
      stripePriceId,
      currentPeriodStart,
      currentPeriodEnd,
      quantity,
    },
  ) => {
    const now = Date.now();
    const subscriptionId = await db.insert("subscriptions", {
      userId,
      plan,
      status: status ?? DEFAULT_SUBSCRIPTION_STATUS,
      stripeSubscriptionId,
      stripeCustomerId,
      stripePriceId,
      currentPeriodStart: currentPeriodStart ?? now,
      currentPeriodEnd,
      createdAt: now,
      quantity,
    });

    await db.patch("users", userId, {
      plan,
      updatedAt: now,
    });

    return db.get("subscriptions", subscriptionId);
  },
});

export const cancelSubscription = mutationGeneric({
  args: {
    subscriptionId: v.id("subscriptions"),
    canceledAt: v.optional(v.number()),
    cancelReason: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("canceled"),
        v.literal("past_due"),
        v.literal("trialing"),
      ),
    ),
    revertToPlan: v.optional(v.string()),
  },
  handler: async (
    { db },
    { subscriptionId, canceledAt, cancelReason, status, revertToPlan },
  ) => {
    const subscription = await db.get("subscriptions", subscriptionId);
    if (!subscription) {
      return null;
    }

    const now = Date.now();
    await db.patch("subscriptions", subscriptionId, {
      status: status ?? "canceled",
      canceledAt: canceledAt ?? now,
      cancelReason,
    });

    await db.patch("users", subscription.userId, {
      plan: revertToPlan ?? "free",
      updatedAt: now,
    });

    return db.get("subscriptions", subscriptionId);
  },
});
