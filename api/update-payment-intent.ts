// Vercel Serverless Function — Update PaymentIntent metadata
// POST /api/update-payment-intent
// Body: {
//   paymentIntentId: string,        // pi_xxx from create-payment-intent
//   email: string,                  // customer email (used for receipt + Resend)
//   customerName?: string,          // for personalising the email
//   productIds: string[]            // cart contents
// }
//
// Called from the Checkout page just before stripe.confirmPayment(). The
// webhook handler reads these values back from paymentIntent.receipt_email
// and paymentIntent.metadata to know who to email and what to send.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return res.status(500).json({ error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your Vercel environment variables." });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

  try {
    const { paymentIntentId, email, customerName, productIds } = req.body as {
      paymentIntentId: string;
      email: string;
      customerName?: string;
      productIds: string[];
    };

    if (!paymentIntentId || !paymentIntentId.startsWith("pi_")) {
      return res.status(400).json({ error: "Invalid paymentIntentId" });
    }
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: "productIds must be a non-empty array" });
    }

    // Stripe metadata values have a 500-char limit; product IDs joined with
    // commas is well under that even for the full catalogue.
    const idsString = productIds.join(",");
    if (idsString.length > 480) {
      return res.status(400).json({ error: "Too many product IDs to fit in metadata" });
    }

    await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
      metadata: {
        product_ids: idsString,
        customer_name: customerName?.slice(0, 200) ?? "",
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("update-payment-intent error:", message);
    return res.status(500).json({ error: message });
  }
}
