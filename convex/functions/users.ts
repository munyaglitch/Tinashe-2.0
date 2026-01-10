import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const createUser = mutationGeneric({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    plan: v.optional(v.string()),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async ({ db }, { email, name, plan, stripeCustomerId }) => {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), normalizedEmail))
      .first();
    if (existingUser) {
      return existingUser;
    }

    const now = Date.now();
    const userId = await db.insert("users", {
      email: normalizedEmail,
      name,
      plan: plan ?? "free",
      stripeCustomerId,
      createdAt: now,
      updatedAt: now,
    });

    return db.get("users", userId);
  },
});

export const getUser = queryGeneric({
  args: {
    id: v.optional(v.id("users")),
    email: v.optional(v.string()),
  },
  handler: async ({ db }, { id, email }) => {
    if (id) {
      return db.get("users", id);
    }
    if (!email) {
      return null;
    }
    const normalizedEmail = normalizeEmail(email);
    return await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), normalizedEmail))
      .first();
  },
});

export const setPlan = mutationGeneric({
  args: {
    userId: v.id("users"),
    plan: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
  },
  handler: async (
    { db },
    { userId, plan, stripeCustomerId, stripePriceId },
  ) => {
    const patchPayload: Record<string, unknown> = {
      plan,
      updatedAt: Date.now(),
    };
    if (stripeCustomerId !== undefined) {
      patchPayload.stripeCustomerId = stripeCustomerId;
    }
    if (stripePriceId !== undefined) {
      patchPayload.stripePriceId = stripePriceId;
    }

    await db.patch("users", userId, patchPayload);
    return db.get("users", userId);
  },
});
