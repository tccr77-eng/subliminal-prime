// Refund Policy Page
import { Link } from "wouter";
export default function RefundPolicy() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl">
          <div className="section-label mb-4">Legal</div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Refund Policy</h1>
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed space-y-6">
            <div className="p-6 rounded-2xl mb-8" style={{ background: "#dcfce7", border: "1px solid #bbf7d0" }}>
              <h3 className="text-lg font-700 text-green-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>30-Day Money-Back Guarantee</h3>
              <p className="text-green-700 text-sm">We offer a full refund within 30 days of purchase — no questions asked. Your satisfaction is guaranteed.</p>
            </div>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>How to request a refund</h2>
            <p>Email us at <a href="mailto:support@subliminalprime.com" className="underline">support@subliminalprime.com</a> within 30 days of your purchase with your order details. We will process your refund within 3–5 business days. The refund will be returned to your original payment method.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Eligibility</h2>
            <p>All programs and bundles are eligible for a full refund within 30 days of purchase. There are no exceptions or conditions — if you're not satisfied, we'll refund you in full.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>After 30 days</h2>
            <p>Refund requests made after 30 days of purchase will be considered on a case-by-case basis. Contact us and we'll do our best to find a fair resolution.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Contact</h2>
            <p>For refund requests or questions, email <a href="mailto:support@subliminalprime.com" className="underline">support@subliminalprime.com</a>.</p>
          </div>
          <div className="mt-10">
            <Link href="/shop"><button className="btn-primary">Browse Programs</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
