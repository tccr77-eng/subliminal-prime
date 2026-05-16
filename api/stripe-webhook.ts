// Vercel Serverless Function — Stripe Webhook Handler
// POST /api/stripe-webhook
//
// Required environment variables in Vercel dashboard:
//   STRIPE_SECRET_KEY       = sk_live_... (or sk_test_...)
//   STRIPE_WEBHOOK_SECRET   = whsec_... (from Stripe dashboard → Webhooks)
//   RESEND_API_KEY          = re_...    (from resend.com → API Keys)
//   ORDERS_FROM_EMAIL       = e.g. "Subliminal Prime <orders@subliminalprime.com>"
//   ORDERS_REPLY_TO         = e.g. "support@subliminalprime.com"  (optional)
//
// Set up in Stripe dashboard:
//   Endpoint URL: https://yourdomain.com/api/stripe-webhook
//   Events to listen for: payment_intent.succeeded, payment_intent.payment_failed

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { Resend } from "resend";

export const config = {
  api: {
    bodyParser: false, // MUST be disabled for Stripe signature verification
  },
};

// ── Product download mapping (inlined to avoid cross-directory imports) ─────
// Maps each product ID to its name and direct download URL.
// SECURITY: download URLs use unguessable suffixes; treat them as semi-secret.
// ⚠️  Before going live: replace every "REPLACE-WITH-..." URL with the real
// Bunny CDN URL for that product's MP3 file. Use random filenames.
interface DownloadInfo {
  name: string;
  downloadUrl: string;
  bundleContents?: string[];
}

const productDownloads: Record<string, DownloadInfo> = {
  // ── 6 core programs ─────────────────────────────────────────
  "deep-sleep": {
    name: "Deep Sleep",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-deep-sleep.mp3",
  },
  "calm-clarity": {
    name: "Calm & Clarity",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-calm-clarity.mp3",
  },
  "wealth-magnet": {
    name: "Wealth Magnet",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-wealth-magnet.mp3",
  },
  "unstoppable-confidence": {
    name: "Unstoppable Confidence",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-unstoppable-confidence.mp3",
  },
  "mindful-body": {
    name: "Mindful Body",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-mindful-body.mp3",
  },
  "magnetic-love": {
    name: "Magnetic Love",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-magnetic-love.mp3",
  },

  // ── Bundles (expanded to constituent products by resolveDownloads) ──
  "foundations-bundle": {
    name: "The Foundations Bundle",
    downloadUrl: "",
    bundleContents: ["deep-sleep", "calm-clarity", "unstoppable-confidence"],
  },
  "manifest-bundle": {
    name: "The Manifest Bundle",
    downloadUrl: "",
    bundleContents: ["wealth-magnet", "unstoppable-confidence", "magnetic-love"],
  },
  "complete-collection": {
    name: "The Complete Collection",
    downloadUrl: "",
    bundleContents: ["deep-sleep", "calm-clarity", "wealth-magnet", "unstoppable-confidence", "mindful-body", "magnetic-love"],
  },
};

function resolveDownloads(productIds: string[]): Array<{ id: string; name: string; downloadUrl: string }> {
  const seen = new Set<string>();
  const result: Array<{ id: string; name: string; downloadUrl: string }> = [];
  for (const id of productIds) {
    const item = productDownloads[id];
    if (!item) continue;
    if (item.bundleContents && item.bundleContents.length > 0) {
      for (const childId of item.bundleContents) {
        if (seen.has(childId)) continue;
        const child = productDownloads[childId];
        if (!child) continue;
        seen.add(childId);
        result.push({ id: childId, name: child.name, downloadUrl: child.downloadUrl });
      }
    } else {
      if (seen.has(id)) continue;
      seen.add(id);
      result.push({ id, name: item.name, downloadUrl: item.downloadUrl });
    }
  }
  return result;
}

// ── Request helpers ───────────────────────────────────────────────────────────

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildDownloadEmail(
  customerName: string,
  items: Array<{ name: string; downloadUrl: string }>,
  amountGbp: number,
  orderId: string,
): { subject: string; html: string; text: string } {
  const greeting = customerName ? `Hi ${customerName.split(" ")[0]},` : "Hi,";

  const itemsHtmlRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:14px 20px;border-bottom:1px solid #e4e2de;font-family:'Space Grotesk',Arial,sans-serif;color:#1a1f2e;font-weight:600;font-size:15px;">
            ${escapeHtml(item.name)}
          </td>
          <td style="padding:14px 20px;border-bottom:1px solid #e4e2de;text-align:right;">
            <a href="${item.downloadUrl}" style="display:inline-block;background:#4f6ef7;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;">Download</a>
          </td>
        </tr>`,
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'Space Grotesk',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
          <tr>
            <td style="padding:36px 36px 18px 36px;">
              <h1 style="margin:0 0 8px 0;font-family:'Space Grotesk',Arial,sans-serif;color:#1a1f2e;font-size:24px;font-weight:800;">Your Subliminal Prime download${items.length > 1 ? "s are" : " is"} ready</h1>
              <p style="margin:0;color:#6b7280;font-size:14px;">Order #${escapeHtml(orderId)} &nbsp;·&nbsp; £${amountGbp.toFixed(2)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 36px 8px 36px;color:#374151;font-size:15px;line-height:1.6;">
              <p style="margin:0 0 14px 0;">${escapeHtml(greeting)}</p>
              <p style="margin:0 0 22px 0;">Thank you for your purchase. Your download${items.length > 1 ? "s are" : " is"} below. Save the file${items.length > 1 ? "s" : ""} somewhere safe — we recommend listening through headphones in a quiet space.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4e2de;border-radius:10px;overflow:hidden;">
                ${itemsHtmlRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 36px 8px 36px;color:#374151;font-size:14px;line-height:1.6;">
              <p style="margin:0 0 12px 0;"><strong>Listening tips:</strong> use headphones, listen at a comfortable volume, and play daily for at least 30 days to give your subconscious time to adapt.</p>
              <p style="margin:0 0 12px 0;">If a download link expires or fails, just reply to this email and we'll resend it.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 36px 36px 36px;border-top:1px solid #e4e2de;color:#9ca3af;font-size:12px;line-height:1.6;">
              <p style="margin:0;">Inner Leader Ltd · 87 Warwick Street, Leamington Spa, CV32 4RJ · Company No. 08973715</p>
              <p style="margin:6px 0 0 0;">30-day money-back guarantee · Need help? <a href="mailto:support@subliminalprime.com" style="color:#4f6ef7;text-decoration:none;">support@subliminalprime.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body></html>`.trim();

  const itemsText = items.map((i) => `• ${i.name}\n  ${i.downloadUrl}`).join("\n\n");
  const text = `${greeting}

Thank you for your purchase. Your download${items.length > 1 ? "s are" : " is"} below.

Order #${orderId} — £${amountGbp.toFixed(2)}

${itemsText}

Listening tips: use headphones, comfortable volume, daily for at least 30 days.

Need help? Reply to this email or write to support@subliminalprime.com.

Inner Leader Ltd · 87 Warwick Street, Leamington Spa, CV32 4RJ · Company No. 08973715`;

  return {
    subject: items.length > 1 ? "Your Subliminal Prime downloads are ready" : "Your Subliminal Prime download is ready",
    html,
    text,
  };
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return res.status(500).json({ error: "Stripe webhook not configured." });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

  let event: Stripe.Event;
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"] as string;
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook signature error:", message);
    return res.status(400).json({ error: message });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const amountGbp = paymentIntent.amount / 100;
      console.log(`Payment succeeded: ${paymentIntent.id} — £${amountGbp.toFixed(2)}`);

      const resendKey = process.env.RESEND_API_KEY;
      const fromAddress = process.env.ORDERS_FROM_EMAIL ?? "Subliminal Prime <orders@subliminalprime.com>";
      const replyTo = process.env.ORDERS_REPLY_TO ?? "support@subliminalprime.com";

      const customerEmail = paymentIntent.receipt_email;
      const productIdsRaw = paymentIntent.metadata?.product_ids ?? "";
      const customerName = paymentIntent.metadata?.customer_name ?? "";

      if (!resendKey) {
        console.error("RESEND_API_KEY is not set — skipping email delivery.");
        break;
      }
      if (!customerEmail) {
        console.error(`No receipt_email on ${paymentIntent.id} — cannot send download email.`);
        break;
      }
      if (!productIdsRaw) {
        console.error(`No product_ids in metadata on ${paymentIntent.id} — cannot resolve downloads.`);
        break;
      }

      const productIds = productIdsRaw.split(",").map((s) => s.trim()).filter(Boolean);
      const items = resolveDownloads(productIds);
      if (items.length === 0) {
        console.error(`resolveDownloads returned no items for ${productIdsRaw}`);
        break;
      }

      try {
        const resend = new Resend(resendKey);
        const orderId = paymentIntent.id.replace(/^pi_/, "SP-").slice(0, 16).toUpperCase();
        const { subject, html, text } = buildDownloadEmail(customerName, items, amountGbp, orderId);

        const result = await resend.emails.send({
          from: fromAddress,
          to: customerEmail,
          replyTo,
          subject,
          html,
          text,
        });

        if (result.error) {
          console.error(`Resend error for ${paymentIntent.id}:`, result.error);
        } else {
          console.log(`Email sent to ${customerEmail} for ${paymentIntent.id} (resend id: ${result.data?.id})`);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown email error";
        console.error(`Email delivery failed for ${paymentIntent.id}:`, message);
      }
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
