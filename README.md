# Subliminal Prime — Complete Project Guide

**Status:** Production-ready | **Last Updated:** May 6, 2025

This is the complete source code for **Subliminal Prime** — a digital audio product e-commerce platform built with React 19, Tailwind CSS 4, Node.js serverless functions, and Stripe payment processing.

---

## 📋 Quick Overview

| Component | Technology | Status |
|---|---|---|
| **Frontend** | React 19 + Tailwind 4 + shadcn/ui | ✅ Complete |
| **Routing** | Wouter (client-side) | ✅ Complete |
| **Payments** | Stripe Payment Element + Webhooks | ✅ Complete |
| **Images** | Bunny CDN (subliminalprime.b-cdn.net) | ✅ Complete |
| **Hosting** | Vercel (recommended) | ⏳ Ready to deploy |
| **Legal** | UK GDPR + Consumer Rights Act 2015 | ✅ Complete (needs company details) |
| **Database** | None (static checkout) | — |

---

## 🚀 Project Structure

```
subliminal-prime/
├── client/                          # React frontend (Vite)
│   ├── public/                      # Static assets (favicon, robots.txt only)
│   ├── src/
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── Shop.tsx             # Product grid
│   │   │   ├── ProductDetail.tsx    # Individual product page
│   │   │   ├── Checkout.tsx         # Stripe Payment Element checkout
│   │   │   ├── PrivacyPolicy.tsx    # UK GDPR compliant
│   │   │   ├── Terms.tsx            # Consumer Rights Act 2015 compliant
│   │   │   ├── RefundPolicy.tsx     # 30-day money-back guarantee
│   │   │   ├── About.tsx            # About page
│   │   │   └── Science.tsx          # Science behind subliminals
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── Header.tsx           # Navigation
│   │   │   ├── Footer.tsx           # Footer with links
│   │   │   └── Map.tsx              # Google Maps integration (unused)
│   │   ├── lib/
│   │   │   ├── products.ts          # Product catalog (27 images from Bunny CDN)
│   │   │   ├── blog.ts              # Blog post data
│   │   │   └── utils.ts             # Helper functions
│   │   ├── contexts/                # React contexts
│   │   ├── hooks/                   # Custom hooks
│   │   ├── App.tsx                  # Route definitions + ThemeProvider
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles + Tailwind config
│   └── index.html                   # HTML template
├── api/                             # Vercel serverless functions
│   ├── create-payment-intent.ts     # POST /api/create-payment-intent
│   └── stripe-webhook.ts            # POST /api/stripe-webhook
├── server/                          # Placeholder (not used in static build)
│   └── index.ts
├── shared/                          # Placeholder (not used in static build)
│   └── const.ts
├── dist/                            # Production build output
│   ├── public/                      # Static HTML + JS + CSS
│   └── index.js                     # Server bundle (for Vercel)
├── package.json                     # Dependencies
├── pnpm-lock.yaml                   # Locked dependency versions
├── vite.config.ts                   # Vite build config
├── vercel.json                      # Vercel deployment config
├── tsconfig.json                    # TypeScript config
└── README.md                        # This file
```

---

## 🛠️ Setup & Development

### Prerequisites
- **Node.js** 18+ (22.13.0 recommended)
- **pnpm** 10.4.1+ (or npm/yarn)
- **Git** (for version control)

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm run dev
```
Server runs at `http://localhost:5173`

### Build for Production
```bash
pnpm run build
```
Output: `dist/public/` (frontend) + `dist/index.js` (server)

### Type Check
```bash
pnpm run type-check
```

---

## 💳 Stripe Integration

### How It Works

1. **Checkout page loads** → `Checkout.tsx` calls `/api/create-payment-intent`
2. **Backend creates PaymentIntent** → `api/create-payment-intent.ts` calls Stripe API
3. **Frontend renders Payment Element** → User enters card / Apple Pay / Google Pay / PayPal
4. **User submits payment** → Stripe processes and calls webhook
5. **Webhook handler fires** → `api/stripe-webhook.ts` verifies signature and logs event
6. **Download link sent** → (Currently logs to console; you'll add email delivery here)

### Environment Variables Required

Create a `.env.local` file in the project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...       # From Stripe Dashboard
STRIPE_SECRET_KEY=sk_live_...                 # From Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_...               # From Stripe Webhook Endpoint
```

### Getting Stripe Keys

1. Go to **[dashboard.stripe.com](https://dashboard.stripe.com)**
2. **API Keys** section → copy `Publishable key` and `Secret key`
3. **Webhooks** section → create endpoint at `https://your-domain.vercel.app/api/stripe-webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

### Test Cards (Stripe)
- **Success:** `4242 4242 4242 4242` | Any future expiry | Any CVC
- **Declined:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

---

## 🖼️ Images & Assets

All 27 product images are hosted on **Bunny CDN** at `https://subliminalprime.b-cdn.net/`.

**Why Bunny CDN?**
- Global edge network (fast delivery)
- Cheaper than AWS CloudFront
- Works perfectly with Vercel
- All URLs are permanent (won't expire)

### Image URLs in Code

All image references use the format:
```typescript
image: "https://subliminalprime.b-cdn.net/product-elite-a1b2c3d4.jpg"
```

See `client/src/lib/products.ts` for the complete list.

---

## 📄 Legal Pages (UK GDPR Compliant)

All three legal pages are **production-ready** but contain placeholders for your company details:

| Page | File | Status | Placeholders |
|---|---|---|---|
| Privacy Policy | `client/src/pages/PrivacyPolicy.tsx` | ✅ Complete | 5 placeholders |
| Terms of Service | `client/src/pages/Terms.tsx` | ✅ Complete | 5 placeholders |
| Refund Policy | `client/src/pages/RefundPolicy.tsx` | ✅ Complete | 5 placeholders |

### Before Going Live — Fill In These Placeholders

Search for `[YOUR` in each file and replace with:

| Placeholder | Example | Where to get |
|---|---|---|
| `[YOUR REGISTERED COMPANY NAME]` | `Subliminal Prime Ltd` | Companies House |
| `[COMPANIES HOUSE NUMBER]` | `12345678` | Companies House confirmation |
| `[YOUR REGISTERED BUSINESS ADDRESS, INCLUDING POSTCODE]` | `123 High Street, London, SW1A 1AA` | Companies House |
| `[YOUR ICO REGISTRATION NUMBER]` | `ZA123456` | [ico.org.uk/registration](https://ico.org.uk/registration) (£40/year) |
| `[EMAIL PROVIDER]` | `Mailgun` or `SendGrid` | Whichever you use |

**Critical:** ICO registration is a legal requirement. Register at [ico.org.uk/registration](https://ico.org.uk/registration) before accepting real payments.

---

## 🚀 Deployment to Vercel

### Step 1 — Import Repository
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import Git Repository"**
3. Select **`tccr77-eng/subliminal-prime`**
4. Click **"Import"**

### Step 2 — Configure Project
Vercel auto-detects settings from `vercel.json`. No changes needed — click **"Deploy"**.

### Step 3 — Add Environment Variables
After first deploy:
1. Go to **Settings → Environment Variables**
2. Add:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
3. Click **"Deployments → Redeploy"** to apply

### Step 4 — Connect Custom Domain
1. **Settings → Domains**
2. Add `subliminalprime.com`
3. Vercel provides DNS records — add them in your domain registrar
4. SSL is automatic

---

## 🔧 What's Implemented

### ✅ Complete
- [x] Product catalog with 27 items
- [x] Shop page with grid layout
- [x] Product detail pages
- [x] Stripe Payment Element checkout
- [x] Serverless payment intent creation
- [x] Webhook handler for payment confirmation
- [x] All images on Bunny CDN
- [x] UK GDPR Privacy Policy
- [x] Consumer Rights Act 2015 Terms of Service
- [x] 30-day refund policy
- [x] Responsive design (mobile-first)
- [x] Dark theme with Space Grotesk typography
- [x] About page
- [x] Science page
- [x] Blog data structure (ready for blog page)

### ⏳ Not Yet Implemented (Optional)
- [ ] Email delivery of download links (currently logs to console)
- [ ] Order history / customer account
- [ ] Blog page (data exists, page not built)
- [ ] Email newsletter signup
- [ ] Analytics dashboard
- [ ] Admin panel for product management
- [ ] Database (currently static product list)

---

## 📧 Email Delivery (Next Steps)

Currently, when a payment succeeds, the webhook logs to console. To actually send download links:

### Option 1: Mailgun (Recommended)
```typescript
// In api/stripe-webhook.ts, after payment_intent.succeeded:
import mailgun from 'mailgun.js';

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

await mg.messages.create('subliminalprime.com', {
  from: 'orders@subliminalprime.com',
  to: paymentIntent.receipt_email,
  subject: 'Your Subliminal Prime Download',
  html: `<p>Download your product: <a href="${downloadLink}">Click here</a></p>`,
});
```

### Option 2: SendGrid
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: paymentIntent.receipt_email,
  from: 'orders@subliminalprime.com',
  subject: 'Your Subliminal Prime Download',
  html: `...`,
});
```

### Option 3: Resend (Vercel-native)
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'orders@subliminalprime.com',
  to: paymentIntent.receipt_email,
  subject: 'Your Subliminal Prime Download',
  html: `...`,
});
```

---

## 🔐 Security Checklist

Before going live:

- [ ] All `[PLACEHOLDER]` values replaced in legal pages
- [ ] ICO registration number added
- [ ] Stripe webhook secret verified (signature validation in place)
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] Environment variables set in Vercel (not in code)
- [ ] Test payments processed with Stripe test keys
- [ ] Live payments tested with Stripe live keys
- [ ] Download link delivery implemented
- [ ] Privacy Policy and Terms linked in footer
- [ ] Cookie consent implemented (if using analytics)

---

## 📚 Key Files to Modify

### To add more products:
Edit `client/src/lib/products.ts` — add entries to the `products` array.

### To change colors/fonts:
Edit `client/src/index.css` — modify CSS variables in `:root` and `.dark`.

### To modify checkout flow:
Edit `client/src/pages/Checkout.tsx` — adjust Payment Element options or add custom fields.

### To handle payment success:
Edit `api/stripe-webhook.ts` — add email delivery or database updates after `payment_intent.succeeded`.

---

## 🐛 Troubleshooting

### Payment Element not showing
- Check `VITE_STRIPE_PUBLISHABLE_KEY` is set and valid
- Check browser console for errors
- Verify Stripe account is in live mode (not test mode)

### Webhook not firing
- Verify webhook URL in Stripe Dashboard matches your Vercel domain
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`
- Look at Stripe Dashboard → Webhooks → Event log for failures

### Images not loading
- Verify Bunny CDN URLs in `client/src/lib/products.ts`
- Check Bunny CDN storage zone is active
- Verify URLs use `https://subliminalprime.b-cdn.net/`

### Build fails
- Run `pnpm install` to ensure all dependencies are installed
- Check `pnpm-lock.yaml` is committed to git
- Verify Node.js version is 18+

---

## 📞 Support & Next Steps

1. **Deploy to Vercel** — Follow the deployment steps above
2. **Add Stripe keys** — Get live keys from Stripe Dashboard
3. **Test payments** — Use Stripe test cards first
4. **Implement email delivery** — Choose Mailgun, SendGrid, or Resend
5. **Fill in legal placeholders** — Replace all `[YOUR ...]` values
6. **Go live** — Switch Stripe to live mode and promote domain

---

## 📝 License

This project is proprietary. All code, designs, and content are owned by Subliminal Prime.

---

**Questions?** Contact: `support@subliminalprime.com`

Last built: May 6, 2025 | Latest commit: `58544c6`
