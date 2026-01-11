import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const createUser = mutationGeneric({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    plan: v.optional(v.string()),
    profilePicture: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    bio: v.optional(v.union(v.string(), v.null())),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (
    { db },
    { email, name, plan, profilePicture, phoneNumber, bio, stripeCustomerId },
  ) => {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), normalizedEmail))
      .first();
    if (existingUser) {
      const patchPayload: Record<string, unknown> = { updatedAt: Date.now() };
      if (profilePicture !== undefined) patchPayload.profilePicture = profilePicture;
      if (phoneNumber !== undefined) patchPayload.phoneNumber = phoneNumber;
      if (bio !== undefined) patchPayload.bio = bio;
      if (stripeCustomerId !== undefined) patchPayload.stripeCustomerId = stripeCustomerId;
      if (Object.keys(patchPayload).length > 1) {
        await db.patch("users", existingUser._id, patchPayload);
        return db.get("users", existingUser._id);
      }
      return existingUser;
    }

    const now = Date.now();
    const userId = await db.insert("users", {
      email: normalizedEmail,
      name,
      plan: plan ?? "free",
      profilePicture,
      phoneNumber,
      bio,
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
    profilePicture: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    bio: v.optional(v.union(v.string(), v.null())),
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
    if (profilePicture !== undefined) {
      patchPayload.profilePicture = profilePicture;
    }
    if (phoneNumber !== undefined) {
      patchPayload.phoneNumber = phoneNumber;
    }
    if (bio !== undefined) {
      patchPayload.bio = bio;
    }

    await db.patch("users", userId, patchPayload);
    return db.get("users", userId);
  },
});
