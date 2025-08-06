import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  faqs: defineTable({
    question: v.string(),
    answer: v.string(),
    keywords: v.array(v.string()),
    isActive: v.boolean(),
  }).index("by_active", ["isActive"]),

  conversations: defineTable({
    platform: v.union(v.literal("whatsapp"), v.literal("instagram"), v.literal("facebook")),
    senderId: v.string(),
    message: v.string(),
    response: v.string(),
    timestamp: v.number(),
  }).index("by_platform", ["platform"])
    .index("by_sender", ["senderId"])
    .index("by_timestamp", ["timestamp"]),

  webhookLogs: defineTable({
    platform: v.string(),
    payload: v.string(),
    status: v.union(v.literal("success"), v.literal("error")),
    error: v.optional(v.string()),
    timestamp: v.number(),
  }).index("by_platform", ["platform"])
    .index("by_timestamp", ["timestamp"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
