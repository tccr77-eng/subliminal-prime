// Vercel Serverless Function — Stripe PaymentIntent
// POST /api/create-payment-intent
// Body: { amount: number (in pence), currency: string, items: CartItem[] }
//
// Required environment variable in Vercel dashboard:
//   STRIPE_SECRET_KEY = sk_live_... (or sk_test_... for testing)

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return res.status(500).json({ error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your Vercel environment variables." });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

  try {
    const { amount, currency = "gbp", metadata = {} } = req.body as {
      amount: number;
      currency?: string;
      metadata?: Record<string, string>;
    };

    if (!amount || typeof amount !== "number" || amount < 50) {
      return res.status(400).json({ error: "Invalid amount. Must be at least 50 (pence)." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // already in pence
      currency,
      automatic_payment_methods: { enabled: true }, // enables Apple Pay, Google Pay, Klarna etc.
      metadata,
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe error:", message);
    return res.status(500).json({ error: message });
  }
}
