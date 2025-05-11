import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  counter: defineTable({
    value: v.int64(),
  }),

  //
  // Start BetterAuth
  //
  user: defineTable({
    name: v.string(),
    email: v.string(),
    emailVerified: v.boolean(),
    image: v.optional(v.string()),
    updatedAt: v.string(),
    isAnonymous: v.boolean(),
  }).index("byEmail", ["email"]),
  session: defineTable({
    expiresAt: v.string(),
    token: v.string(),
    updatedAt: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    userId: v.id("user"),
  })
    .index("byToken", ["token"])
    .index("byUserId", ["userId"]),
  jwks: defineTable({
    publicKey: v.string(),
    privateKey: v.string(),
  }),
  //
  // End BetterAuth
  //
});
export default schema;
