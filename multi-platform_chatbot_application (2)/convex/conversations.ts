import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    platform: v.optional(v.union(v.literal("whatsapp"), v.literal("instagram"), v.literal("facebook"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    
    if (args.platform) {
      return await ctx.db
        .query("conversations")
        .withIndex("by_platform", (q) => q.eq("platform", args.platform!))
        .order("desc")
        .take(args.limit || 50);
    }
    
    return await ctx.db
      .query("conversations")
      .order("desc")
      .take(args.limit || 50);
  },
});

export const create = mutation({
  args: {
    platform: v.union(v.literal("whatsapp"), v.literal("instagram"), v.literal("facebook")),
    senderId: v.string(),
    message: v.string(),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("conversations", {
      platform: args.platform,
      senderId: args.senderId,
      message: args.message,
      response: args.response,
      timestamp: Date.now(),
    });
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    await getAuthUserId(ctx);
    
    const conversations = await ctx.db.query("conversations").collect();
    
    const stats = {
      total: conversations.length,
      whatsapp: conversations.filter(c => c.platform === "whatsapp").length,
      instagram: conversations.filter(c => c.platform === "instagram").length,
      facebook: conversations.filter(c => c.platform === "facebook").length,
      today: conversations.filter(c => {
        const today = new Date();
        const conversationDate = new Date(c.timestamp);
        return conversationDate.toDateString() === today.toDateString();
      }).length,
    };
    
    return stats;
  },
});
