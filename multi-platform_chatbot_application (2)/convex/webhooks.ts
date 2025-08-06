import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const logWebhook = mutation({
  args: {
    platform: v.string(),
    payload: v.string(),
    status: v.union(v.literal("success"), v.literal("error")),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("webhookLogs", {
      platform: args.platform,
      payload: args.payload,
      status: args.status,
      error: args.error,
      timestamp: Date.now(),
    });
  },
});
