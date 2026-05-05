// Vercel Serverless Function — Stripe Webhook Handler
// POST /api/stripe-webhook
//
// Required environment variables in Vercel dashboard:
//   STRIPE_SECRET_KEY       = sk_live_... (or sk_test_...)
//   STRIPE_WEBHOOK_SECRET   = whsec_... (from Stripe dashboard → Webhooks)
//
// Set up in Stripe dashboard:
//   Endpoint URL: https://yourdomain.com/api/stripe-webhook
//   Events to listen for: payment_intent.succeeded, payment_intent.payment_failed

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // MUST be disabled for Stripe signature verification
  },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return res.status(500).json({ error: "Stripe webhook not configured." });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-04-30" });

  let event: Stripe.Event;
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"] as string;
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook error:", message);
    return res.status(400).json({ error: message });
  }

  // Handle events
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment succeeded: ${paymentIntent.id} — £${(paymentIntent.amount / 100).toFixed(2)}`);
      // TODO: Send download email to customer using paymentIntent.metadata.email
      // Example: await sendDownloadEmail(paymentIntent.metadata.email, paymentIntent.metadata.items);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${paymentIntent.id}`);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
