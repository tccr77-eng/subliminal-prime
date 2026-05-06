// Refund Policy Page — UK Consumer Rights Act 2015 Compliant
import { Link } from "wouter";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-700 text-[#1a1f2e] mt-8 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{children}</h2>
);

export default function RefundPolicy() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl">
          <div className="section-label mb-4">Legal</div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Refund Policy</h1>
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: 6 May 2025</p>

          <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed">

            {/* Guarantee highlight box */}
            <div className="p-6 rounded-2xl mb-8" style={{ background: "#dcfce7", border: "1px solid #bbf7d0" }}>
              <h3 className="text-lg font-700 text-green-800 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>30-Day Money-Back Guarantee</h3>
              <p className="text-green-700 text-sm">
                We offer a full refund within 30 days of purchase — no questions asked. Your satisfaction is
                guaranteed. This is in addition to your statutory rights under UK consumer law.
              </p>
            </div>

            <p>
              This Refund Policy applies to all digital products purchased from{" "}
              <strong>subliminalprime.com</strong> and is operated by{" "}
              <strong>[YOUR REGISTERED COMPANY NAME]</strong>. It is written in accordance with the{" "}
              <strong>Consumer Rights Act 2015</strong> and the{" "}
              <strong>Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</strong>.
            </p>

            <H2>1. Your statutory rights</H2>
            <p>
              Under the <strong>Consumer Rights Act 2015</strong>, digital content must be of satisfactory
              quality, fit for purpose, and as described. If your download is faulty, corrupted, or materially
              different from its description, you are entitled to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A <strong>repair or replacement</strong> of the digital content, or</li>
              <li>A <strong>full or partial refund</strong> if repair or replacement is not possible or not provided within a reasonable time</li>
            </ul>
            <p>
              These rights are not affected or limited by our voluntary 30-day guarantee.
            </p>

            <H2>2. Right to cancel (digital content)</H2>
            <p>
              Under the <strong>Consumer Contracts Regulations 2013</strong>, you normally have a 14-day
              cooling-off period for online purchases. However, for digital content not supplied on a tangible
              medium (such as downloadable MP3 files), this right to cancel is lost once:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You have given your <strong>express consent</strong> for the download to begin before the 14-day period expires, and</li>
              <li>You have <strong>acknowledged</strong> that you will lose your right to cancel once the download commences</li>
            </ul>
            <p>
              By completing your purchase, you provide this consent and acknowledgement. This is standard
              practice for digital download products under UK law.
            </p>

            <H2>3. Our 30-day money-back guarantee</H2>
            <p>
              Regardless of the above statutory position, we voluntarily offer a{" "}
              <strong>full 30-day money-back guarantee</strong> on all products. If you are not satisfied for
              any reason within 30 days of your purchase date, we will refund you in full — no questions asked.
            </p>
            <p>This guarantee applies to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All individual programs</li>
              <li>All bundle packages</li>
              <li>All purchases regardless of whether you have downloaded the files</li>
            </ul>

            <H2>4. How to request a refund</H2>
            <p>To request a refund under either your statutory rights or our 30-day guarantee:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Email us at{" "}
                <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                  support@subliminalprime.com
                </a>
              </li>
              <li>Include your <strong>order number</strong> (found in your order confirmation email) and the <strong>email address</strong> used at checkout</li>
              <li>Briefly describe the reason for your refund request (optional for our 30-day guarantee, but helpful for us to improve)</li>
            </ol>
            <p>
              We will acknowledge your request within <strong>2 business days</strong> and process your refund
              within <strong>3–5 business days</strong> of approval. Refunds are returned to your original
              payment method. Please allow an additional 3–5 business days for your bank or card issuer to
              process the credit.
            </p>

            <H2>5. Refunds after 30 days</H2>
            <p>
              Refund requests made after 30 days of purchase will be considered on a case-by-case basis. We
              will always honour your statutory rights under the Consumer Rights Act 2015 regardless of when
              the issue is reported. For requests outside our voluntary guarantee period, please contact us and
              we will do our best to find a fair resolution.
            </p>

            <H2>6. Chargebacks</H2>
            <p>
              We ask that you contact us directly before initiating a chargeback with your bank or card issuer.
              We are committed to resolving all issues promptly and fairly. Initiating a chargeback without
              first contacting us may result in your account being suspended pending investigation.
            </p>

            <H2>7. Contact us</H2>
            <p>
              For refund requests or questions about this policy, please contact us:
            </p>
            <div className="p-5 rounded-xl mt-3" style={{ background: "#f2f0ec" }}>
              <p className="font-semibold text-[#1a1f2e]">[YOUR REGISTERED COMPANY NAME]</p>
              <p>[YOUR REGISTERED BUSINESS ADDRESS]</p>
              <p>[CITY, POSTCODE]</p>
              <p>United Kingdom</p>
              <p className="mt-2">
                Email:{" "}
                <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                  support@subliminalprime.com
                </a>
              </p>
            </div>

          </div>

          <div className="mt-10">
            <Link href="/shop"><button className="btn-primary">Browse Programs</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
