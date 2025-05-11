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
  oauthApplication: defineTable({
    clientId: v.string(),
    clientSecret: v.string(),
    name: v.string(),
    redirectURLs: v.string(),
    metadata: v.optional(v.string()),
    type: v.string(),
    disabled: v.boolean(),
    userId: v.optional(v.id("user")),
    updatedAt: v.string(),
  }).index("byClientId", ["clientId"]),
  oauthAccessToken: defineTable({
    accessToken: v.string(),
    refreshToken: v.string(),
    accessTokenExpiresAt: v.string(),
    refreshTokenExpiresAt: v.string(),
    clientId: v.id("oauthApplication"),
    userId: v.id("user"),
    scopes: v.string(),
    updatedAt: v.string(),
  }),
  oauthConsent: defineTable({
    userId: v.id("user"),
    clientId: v.id("oauthApplication"),
    scopes: v.string(),
    consentGiven: v.boolean(),
    updatedAt: v.string(),
  }),
  //
  // End BetterAuth
  //
});
export default schema;
