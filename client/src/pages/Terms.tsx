// Terms of Service Page — UK Law Compliant
// Company details filled in for Inner Leader Ltd (08973715) — last reviewed 2026-05-16

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-700 text-[#1a1f2e] mt-8 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-700 text-[#1a1f2e] mt-5 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{children}</h3>
);

export default function Terms() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl">
          <div className="section-label mb-4">Legal</div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Terms of Service</h1>
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: 6 May 2025</p>

          <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed">

            <p>
              These Terms of Service ("Terms") govern your use of the website{" "}
              <strong>subliminalprime.com</strong> (the "Site") and your purchase of digital products from{" "}
              <strong>Subliminal Prime</strong>, operated by{" "}
              <strong>Inner Leader Ltd</strong> (company number{" "}
              <strong>08973715</strong>), registered at{" "}
              <strong>87 Warwick Street, Leamington Spa, CV32 4RJ</strong>{" "}
              ("we", "us", "our").
            </p>
            <p>
              By accessing the Site or purchasing any product, you agree to be bound by these Terms. If you do
              not agree, please do not use the Site or make a purchase.
            </p>
            <p>
              These Terms are governed by the laws of <strong>England and Wales</strong> and comply with the
              Consumer Rights Act 2015, the Consumer Contracts (Information, Cancellation and Additional
              Charges) Regulations 2013, and all other applicable UK consumer protection legislation.
            </p>

            <H2>1. About us</H2>
            <p>
              <strong>Inner Leader Ltd</strong> is a company registered in England and Wales
              (company number <strong>08973715</strong>). Our registered office is at{" "}
              <strong>87 Warwick Street, Leamington Spa, CV32 4RJ</strong>. You can contact us at{" "}
              <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                support@subliminalprime.com
              </a>.
            </p>

            <H2>2. Our products</H2>
            <p>
              Subliminal Prime sells <strong>digital audio products</strong> delivered as downloadable MP3
              files. All products are personal development tools intended for entertainment and self-improvement
              purposes.
            </p>
            <p>
              <strong>Important disclaimer:</strong> Our products are not medical devices, therapeutic
              treatments, or substitutes for professional medical, psychological, psychiatric, or financial
              advice. They have not been evaluated or approved by any regulatory body. If you have a medical or
              mental health condition, please consult a qualified healthcare professional before use. Individual
              results vary and we make no guarantee of specific outcomes.
            </p>

            <H2>3. Placing an order</H2>
            <H3>3.1 How a contract is formed</H3>
            <p>
              When you place an order on our Site, you are making an offer to purchase the selected product(s).
              A binding contract is formed when we send you an order confirmation email. We reserve the right
              to decline any order at our discretion.
            </p>
            <H3>3.2 Pre-contractual information</H3>
            <p>
              Before you complete your purchase, we provide you with the following information as required by
              the Consumer Contracts Regulations 2013:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A clear description of each product</li>
              <li>The total price including any applicable taxes</li>
              <li>Our refund and cancellation policy</li>
              <li>Our contact details</li>
            </ul>
            <H3>3.3 Pricing</H3>
            <p>
              All prices are displayed in <strong>British Pounds Sterling (GBP)</strong> and are inclusive of
              any applicable VAT. We reserve the right to change prices at any time, but changes will not
              affect orders already confirmed.
            </p>

            <H2>4. Payment</H2>
            <p>
              Payment is processed securely by <strong>Stripe, Inc.</strong>, a PCI DSS Level 1 certified
              payment processor. We accept major debit and credit cards, Apple Pay, Google Pay, and other
              payment methods as displayed at checkout. We do not store your payment card details.
            </p>
            <p>
              By providing payment details, you confirm that you are authorised to use the payment method and
              that the information provided is accurate.
            </p>

            <H2>5. Digital content delivery</H2>
            <p>
              Upon successful payment, download links for your purchased product(s) will be sent to the email
              address you provided at checkout. Download links are typically delivered within minutes of
              purchase.
            </p>
            <p>
              If you do not receive your download links within 1 hour of purchase, please check your spam
              folder and then contact us at{" "}
              <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                support@subliminalprime.com
              </a>.
            </p>

            <H2>6. Right to cancel and refunds</H2>
            <H3>6.1 Cancellation right for digital content</H3>
            <p>
              Under the Consumer Contracts Regulations 2013, you normally have a 14-day right to cancel
              purchases made online. However, for digital content that is not supplied on a tangible medium
              (such as downloadable files), this right to cancel is lost once you have given your express
              consent to begin downloading and acknowledged that you thereby lose your cancellation right.
            </p>
            <p>
              By completing your purchase, you expressly consent to the immediate delivery of the digital
              content and acknowledge that you lose your statutory right to cancel once the download has
              commenced.
            </p>
            <H3>6.2 Our 30-day money-back guarantee</H3>
            <p>
              Notwithstanding the above, we voluntarily offer a <strong>30-day money-back guarantee</strong> on
              all products. If you are not satisfied for any reason, email us at{" "}
              <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                support@subliminalprime.com
              </a>{" "}
              within 30 days of your purchase date with your order details, and we will issue a full refund to
              your original payment method within 3–5 business days. No questions asked.
            </p>
            <p>
              This guarantee is in addition to, and does not affect, your statutory rights under UK consumer
              law.
            </p>
            <H3>6.3 Faulty or misdescribed digital content</H3>
            <p>
              Under the Consumer Rights Act 2015, digital content must be of satisfactory quality, fit for
              purpose, and as described. If your download is corrupted, incomplete, or materially different
              from its description, you are entitled to a repair, replacement, or refund. Please contact us
              immediately at{" "}
              <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                support@subliminalprime.com
              </a>.
            </p>

            <H2>7. Licence to use digital products</H2>
            <p>
              Upon purchase, we grant you a <strong>personal, non-exclusive, non-transferable, revocable
              licence</strong> to use the purchased audio files for your own private, personal use only.
            </p>
            <p>You may <strong>not</strong>:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Copy, reproduce, or duplicate the files beyond personal backup copies</li>
              <li>Distribute, share, upload, or transmit the files to any third party</li>
              <li>Resell, sublicence, or commercially exploit the files in any way</li>
              <li>Use the files in any public performance, broadcast, or commercial context</li>
              <li>Reverse engineer, modify, or create derivative works from the audio content</li>
            </ul>
            <p>
              Any breach of this licence will result in immediate termination of your right to use the product
              and may result in legal action.
            </p>

            <H2>8. Intellectual property</H2>
            <p>
              All content on this Site — including but not limited to audio files, text, images, graphics,
              logos, and the "Subliminal Prime" brand name and trade mark — is the intellectual property of{" "}
              <strong>Inner Leader Ltd</strong> or its licensors and is protected by UK and
              international copyright, trade mark, and other intellectual property laws.
            </p>
            <p>
              Nothing in these Terms grants you any rights in our intellectual property other than the limited
              licence described in Section 7.
            </p>

            <H2>9. Acceptable use</H2>
            <p>You agree not to use the Site to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the intellectual property rights of any third party</li>
              <li>Transmit any harmful, offensive, or fraudulent content</li>
              <li>Attempt to gain unauthorised access to our systems or data</li>
              <li>Engage in any conduct that could damage, disable, or impair the Site</li>
            </ul>

            <H2>10. Limitation of liability</H2>
            <p>
              To the maximum extent permitted by applicable law, <strong>Inner Leader Ltd</strong>{" "}
              shall not be liable for any:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from your reliance on the products for medical, psychological, or financial decisions</li>
            </ul>
            <p>
              Nothing in these Terms limits or excludes our liability for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Death or personal injury caused by our negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
              <li>Any liability that cannot be excluded under UK law</li>
              <li>Your statutory rights as a consumer under the Consumer Rights Act 2015</li>
            </ul>
            <p>
              Our total aggregate liability to you in connection with these Terms shall not exceed the total
              amount paid by you for the product(s) giving rise to the claim.
            </p>

            <H2>11. Third-party links</H2>
            <p>
              Our Site may contain links to third-party websites. These links are provided for your convenience
              only. We have no control over the content of those sites and accept no responsibility for them or
              for any loss or damage that may arise from your use of them.
            </p>

            <H2>12. Changes to these Terms</H2>
            <p>
              We may update these Terms from time to time. The updated Terms will be posted on this page with a
              revised "Last updated" date. Continued use of the Site after any changes constitutes your
              acceptance of the new Terms. We recommend reviewing this page periodically.
            </p>

            <H2>13. Governing law and jurisdiction</H2>
            <p>
              These Terms are governed by the laws of <strong>England and Wales</strong>. Any disputes arising
              from or in connection with these Terms shall be subject to the exclusive jurisdiction of the
              courts of England and Wales, except where you are a consumer resident in Scotland or Northern
              Ireland, in which case you may bring proceedings in the courts of your home jurisdiction.
            </p>
            <p>
              As a consumer, you may also have access to alternative dispute resolution (ADR) schemes. The
              European Commission's Online Dispute Resolution platform is available at{" "}
              <a href="https://ec.europa.eu/consumers/odr" className="underline text-[#4f6ef7]" target="_blank" rel="noopener noreferrer">
                ec.europa.eu/consumers/odr
              </a>, though we are not obliged to participate in ADR.
            </p>

            <H2>14. Contact us</H2>
            <p>
              For any questions about these Terms, please contact us:
            </p>
            <div className="p-5 rounded-xl mt-3" style={{ background: "#f2f0ec" }}>
              <p className="font-semibold text-[#1a1f2e]">Inner Leader Ltd</p>
              <p>87 Warwick Street</p>
              <p>Leamington Spa, CV32 4RJ</p>
              <p>United Kingdom</p>
              <p className="mt-2">
                Email:{" "}
                <a href="mailto:support@subliminalprime.com" className="underline text-[#4f6ef7]">
                  support@subliminalprime.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
