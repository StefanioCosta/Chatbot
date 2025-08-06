import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("faqs")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await getAuthUserId(ctx);
    return await ctx.db.query("faqs").collect();
  },
});

export const create = mutation({
  args: {
    question: v.string(),
    answer: v.string(),
    keywords: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    return await ctx.db.insert("faqs", {
      question: args.question,
      answer: args.answer,
      keywords: args.keywords,
      isActive: true,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("faqs"),
    question: v.string(),
    answer: v.string(),
    keywords: v.array(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("faqs") },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    return await ctx.db.delete(args.id);
  },
});

export const findAnswer = query({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    const faqs = await ctx.db
      .query("faqs")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    const normalizedMessage = args.message.toLowerCase().trim();
    
    // Find FAQ by matching keywords or question content
    const matchedFaq = faqs.find((faq) => {
      const questionMatch = faq.question.toLowerCase().includes(normalizedMessage) ||
                           normalizedMessage.includes(faq.question.toLowerCase());
      
      const keywordMatch = faq.keywords.some(keyword => 
        normalizedMessage.includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(normalizedMessage)
      );
      
      return questionMatch || keywordMatch;
    });

    return matchedFaq ? matchedFaq.answer : "Desculpa, não entendi sua pergunta. Pode reformular ou entrar em contato conosco diretamente?";
  },
});
