import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";

const http = httpRouter();

// WhatsApp Webhook
http.route({
  path: "/webhook/whatsapp",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const entry = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      
      if (entry) {
        const senderId = entry.from;
        const message = entry.text?.body;
        
        if (senderId && message) {
          // Find answer
          const response = await ctx.runQuery(api.faqs.findAnswer, { message });
          
          // Log conversation
          await ctx.runMutation(api.conversations.create, {
            platform: "whatsapp",
            senderId,
            message,
            response,
          });
          
          // Log webhook
          await ctx.runMutation(api.webhooks.logWebhook, {
            platform: "whatsapp",
            payload: JSON.stringify(body),
            status: "success",
          });
        }
      }
      
      return new Response("OK", { status: 200 });
    } catch (error) {
      await ctx.runMutation(api.webhooks.logWebhook, {
        platform: "whatsapp",
        payload: JSON.stringify(await request.json()),
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
      
      return new Response("Error", { status: 500 });
    }
  }),
});

// Instagram Webhook
http.route({
  path: "/webhook/instagram",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const entry = body.entry?.[0]?.messaging?.[0];
      
      if (entry) {
        const senderId = entry.sender?.id;
        const message = entry.message?.text;
        
        if (senderId && message) {
          // Find answer
          const response = await ctx.runQuery(api.faqs.findAnswer, { message });
          
          // Log conversation
          await ctx.runMutation(api.conversations.create, {
            platform: "instagram",
            senderId,
            message,
            response,
          });
          
          // Log webhook
          await ctx.runMutation(api.webhooks.logWebhook, {
            platform: "instagram",
            payload: JSON.stringify(body),
            status: "success",
          });
        }
      }
      
      return new Response("OK", { status: 200 });
    } catch (error) {
      await ctx.runMutation(api.webhooks.logWebhook, {
        platform: "instagram",
        payload: JSON.stringify(await request.json()),
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
      
      return new Response("Error", { status: 500 });
    }
  }),
});

// Facebook Webhook
http.route({
  path: "/webhook/facebook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const entry = body.entry?.[0]?.messaging?.[0];
      
      if (entry) {
        const senderId = entry.sender?.id;
        const message = entry.message?.text;
        
        if (senderId && message) {
          // Find answer
          const response = await ctx.runQuery(api.faqs.findAnswer, { message });
          
          // Log conversation
          await ctx.runMutation(api.conversations.create, {
            platform: "facebook",
            senderId,
            message,
            response,
          });
          
          // Log webhook
          await ctx.runMutation(api.webhooks.logWebhook, {
            platform: "facebook",
            payload: JSON.stringify(body),
            status: "success",
          });
        }
      }
      
      return new Response("OK", { status: 200 });
    } catch (error) {
      await ctx.runMutation(api.webhooks.logWebhook, {
        platform: "facebook",
        payload: JSON.stringify(await request.json()),
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
      
      return new Response("Error", { status: 500 });
    }
  }),
});

// Webhook verification for all platforms
http.route({
  path: "/webhook/whatsapp",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "your_verify_token";
    
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }),
});

http.route({
  path: "/webhook/instagram",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "your_verify_token";
    
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }),
});

http.route({
  path: "/webhook/facebook",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "your_verify_token";
    
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }),
});

export default http;
