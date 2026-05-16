// Privacy Policy Page — UK GDPR Compliant
// Company details filled in for Inner Leader Ltd (08973715, ICO ZA688599) — last reviewed 2026-05-16

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-700 text-[#1a1f2e] mt-8 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base font-700 text-[#1a1f2e] mt-5 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{children}</h3>
);

export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl">
          <div className="section-label mb-4">Legal</div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Privacy Policy</h1>
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: 6 May 2025</p>

          <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed">

            <p>
              This Privacy Policy explains how <strong>Subliminal Prime</strong>, operated by{" "}
              <strong>Inner Leader Ltd</strong> (company number{" "}
              <strong>08973715</strong>), registered at{" "}
              <strong>87 Warwick Street, Leamington Spa, CV32 4RJ</strong>{" "}
              ("we", "us", "our"), collects, uses, and protects your personal data when you visit{" "}
              <strong>subliminalprime.com</strong> or purchase our products.
            </p>
            <p>
              We are registered with the Information Commissioner's Office (ICO) under registration number{" "}
              <strong>ZA688599</strong>. We act as the <strong>data controller</strong> for
              the personal data described in this policy.
            </p>
            <p>
              This policy is written in accordance with the UK General Data Protection Regulation (UK GDPR) and
              the Data Protection Act 2018.
            </p>

            <H2>1. What personal data we collect</H2>
            <p>We collect the following categories of personal data:</p>

            <H3>1.1 Data you provide directly</H3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity data:</strong> first name, last name</li>
              <li><strong>Contact data:</strong> email address, billing address (street, city, postcode, country)</li>
              <li><strong>Transaction data:</strong> details of products purchased, order amounts, order dates</li>
              <li><strong>Communications data:</strong> messages you send us via email or our contact form</li>
            </ul>
            <p>
              <strong>Payment data:</strong> We do not store your card details. All payment processing is handled
              directly by <strong>Stripe, Inc.</strong> (a PCI DSS Level 1 certified payment processor). Stripe
              may collect and process your card number, expiry date, and CVC under their own privacy policy,
              available at{" "}
              <a href="https://stripe.com/gb/privacy" className="underline text-[#4f6ef7]" target="_blank" rel="noopener noreferrer">
                stripe.com/gb/privacy
              </a>.
            </p>

            <H3>1.2 Data collected automatically</H3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Technical data:</strong> IP address (anonymised), browser type and version, device type, operating system</li>
              <li><strong>Usage data:</strong> pages visited, time on site, referring URLs, clicks — collected via anonymised analytics only</li>
              <li><strong>Cookie data:</strong> see Section 6 below</li>
            </ul>
            <p>We do not collect any special category data (e.g. health, biometric, or financial data beyond transaction records).</p>

            <H2>2. Legal basis for processing</H2>
            <p>Under UK GDPR, we must have a lawful basis for processing your personal data. We rely on the following:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3 mb-3">
                <thead>
                  <tr style={{ background: "#f2f0ec" }}>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Lawful basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Processing your order and delivering download links", "Performance of a contract (Article 6(1)(b))"],
                    ["Sending order confirmation and receipt emails", "Performance of a contract (Article 6(1)(b))"],
                    ["Responding to customer support enquiries", "Legitimate interests (Article 6(1)(f))"],
                    ["Fraud prevention and security", "Legitimate interests (Article 6(1)(f))"],
                    ["Complying with legal obligations (e.g. tax records)", "Legal obligation (Article 6(1)(c))"],
                    ["Sending marketing emails (if you opt in)", "Consent (Article 6(1)(a))"],
                    ["Anonymised website analytics", "Legitimate interests (Article 6(1)(f))"],
                  ].map(([purpose, basis], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#faf9f7" : "#f7f6f3" }}>
                      <td className="p-3 border border-[#e4e2de]">{purpose}</td>
                      <td className="p-3 border border-[#e4e2de]">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <H2>3. How we use your personal data</H2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To process and fulfil your order, including sending download links to your email address</li>
              <li>To send transactional emails (order confirmation, receipts, download delivery)</li>
              <li>To respond to your customer support requests</li>
              <li>To process refund requests in accordance with our Refund Policy</li>
              <li>To maintain financial and tax records as required by UK law</li>
              <li>To detect and prevent fraud or abuse of our services</li>
              <li>To improve our website and products using anonymised analytics data</li>
              <li>To send you marketing emails about new products or promotions, <strong>only if you have explicitly opted in</strong></li>
            </ul>
            <p>We will never sell, rent, or trade your personal data to third parties for their own marketing purposes.</p>

            <H2>4. Data sharing and third-party processors</H2>
            <p>
              We share your personal data only with trusted third-party service providers who process data on our
              behalf, under data processing agreements that comply with UK GDPR:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3 mb-3">
                <thead>
                  <tr style={{ background: "#f2f0ec" }}>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Processor</th>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Stripe, Inc.", "Payment processing", "USA (EU-US Data Privacy Framework)"],
                    ["Vercel, Inc.", "Website hosting", "USA (Standard Contractual Clauses)"],
                    ["Bunny.net", "Content delivery network (images)", "EU / UK"],
                    ["Resend, Inc.", "Transactional email delivery (download links, receipts)", "USA (Standard Contractual Clauses)"],
                  ].map(([processor, purpose, location], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#faf9f7" : "#f7f6f3" }}>
                      <td className="p-3 border border-[#e4e2de] font-medium">{processor}</td>
                      <td className="p-3 border border-[#e4e2de]">{purpose}</td>
                      <td className="p-3 border border-[#e4e2de]">{location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              We may also disclose your data where required by law, court order, or to protect the rights,
              property, or safety of our business, customers, or others.
            </p>

            <H2>5. International data transfers</H2>
            <p>
              Some of our third-party processors are based outside the UK. Where we transfer personal data
              outside the UK, we ensure appropriate safeguards are in place, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>UK adequacy decisions (where applicable)</li>
              <li>Standard Contractual Clauses (SCCs) approved by the ICO</li>
              <li>The UK International Data Transfer Agreement (IDTA)</li>
            </ul>

            <H2>6. Cookies</H2>
            <p>We use the following types of cookies:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3 mb-3">
                <thead>
                  <tr style={{ background: "#f2f0ec" }}>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Type</th>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[#1a1f2e] border border-[#e4e2de]">Consent required?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Essential / Strictly necessary", "Maintain your shopping cart session; remember cookie consent preference", "No — necessary for the site to function"],
                    ["Analytics (anonymised)", "Understand how visitors use the site; no personally identifiable data collected", "Yes — only set after consent"],
                    ["Marketing / Tracking", "We do not use marketing or tracking cookies", "N/A"],
                  ].map(([type, purpose, consent], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#faf9f7" : "#f7f6f3" }}>
                      <td className="p-3 border border-[#e4e2de] font-medium">{type}</td>
                      <td className="p-3 border border-[#e4e2de]">{purpose}</td>
                      <td className="p-3 border border-[#e4e2de]">{consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              You can manage or withdraw your cookie consent at any time by clicking "Cookie Settings" in the
              footer, or by adjusting your browser settings. Note that disabling essential cookies may affect
              site functionality.
            </p>

            <H2>7. Data retention</H2>
            <p>We retain your personal data only for as long as necessary for the purposes set out in this policy:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Order and transaction records:</strong> 7 years (required by UK tax law — HMRC)</li>
              <li><strong>Customer support communications:</strong> 2 years from last contact</li>
              <li><strong>Marketing consent records:</strong> Until you withdraw consent, plus 1 year</li>
              <li><strong>Website analytics data:</strong> 26 months (anonymised)</li>
            </ul>
            <p>
              After the applicable retention period, your data is securely deleted or anonymised.
            </p>

            <H2>8. Your rights under UK GDPR</H2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you (Subject Access Request)</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to erasure ("right to be forgotten"):</strong> Request deletion of your data, where no legal obligation requires us to retain it</li>
              <li><strong>Right to restriction of processing:</strong> Request that we limit how we use your data in certain circumstances</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing purposes</li>
              <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing</li>
              <li><strong>Rights related to automated decision-making:</strong> We do not use automated decision-making or profiling that produces legal or similarly significant effects</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:privacy@subliminalprime.com" className="underline text-[#4f6ef7]">privacy@subliminalprime.com</a>.
              We will respond within <strong>30 days</strong> of receiving your request. We may need to verify
              your identity before processing your request.
            </p>
            <p>
              You also have the right to lodge a complaint with the{" "}
              <strong>Information Commissioner's Office (ICO)</strong> at{" "}
              <a href="https://ico.org.uk/make-a-complaint" className="underline text-[#4f6ef7]" target="_blank" rel="noopener noreferrer">
                ico.org.uk/make-a-complaint
              </a>{" "}
              or by calling <strong>0303 123 1113</strong>, if you believe we have not handled your data lawfully.
            </p>

            <H2>9. Data security</H2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data
              against unauthorised access, accidental loss, destruction, or disclosure. These include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>TLS/SSL encryption for all data transmitted between your browser and our website</li>
              <li>We do not store payment card data — all card processing is handled by Stripe's PCI DSS Level 1 certified infrastructure</li>
              <li>Access to personal data is restricted to authorised personnel only</li>
              <li>Regular review of our data handling practices</li>
            </ul>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your rights and
              freedoms, we will notify the ICO within 72 hours and, where required, notify affected individuals
              without undue delay.
            </p>

            <H2>10. Children's privacy</H2>
            <p>
              Our website and products are not directed at children under the age of 16. We do not knowingly
              collect personal data from children under 16. If you believe a child has provided us with personal
              data, please contact us immediately at{" "}
              <a href="mailto:privacy@subliminalprime.com" className="underline text-[#4f6ef7]">privacy@subliminalprime.com</a>{" "}
              and we will delete it promptly.
            </p>

            <H2>11. Changes to this policy</H2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              applicable law. We will post the updated policy on this page with a revised "Last updated" date.
              For significant changes, we will notify you by email (if we hold your email address) or by
              displaying a prominent notice on our website.
            </p>

            <H2>12. Contact us</H2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your personal data, please
              contact our data controller:
            </p>
            <div className="p-5 rounded-xl mt-3" style={{ background: "#f2f0ec" }}>
              <p className="font-semibold text-[#1a1f2e]">Inner Leader Ltd</p>
              <p>87 Warwick Street</p>
              <p>Leamington Spa, CV32 4RJ</p>
              <p>United Kingdom</p>
              <p className="mt-2">
                Email:{" "}
                <a href="mailto:privacy@subliminalprime.com" className="underline text-[#4f6ef7]">
                  privacy@subliminalprime.com
                </a>
              </p>
              <p>ICO Registration No.: <strong>ZA688599</strong></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
