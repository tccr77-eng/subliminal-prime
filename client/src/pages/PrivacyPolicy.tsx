// Privacy Policy Page
export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl">
          <div className="section-label mb-4">Legal</div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Privacy Policy</h1>
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed space-y-6">
            <p>Subliminal Prime ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Information we collect</h2>
            <p>When you make a purchase, we collect your name, email address, and payment information. Payment details are processed by Stripe and are never stored on our servers. We may also collect usage data (pages visited, time on site) via anonymised analytics.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>How we use your information</h2>
            <p>We use your information to process orders, deliver download links, provide customer support, and send order-related communications. We do not sell your personal data to third parties. We may send occasional product updates if you have opted in.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Cookies</h2>
            <p>We use essential cookies to maintain your shopping cart session. We do not use tracking or advertising cookies without your consent.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Your rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at support@subliminalprime.com.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Contact</h2>
            <p>For privacy-related enquiries, email <a href="mailto:support@subliminalprime.com" className="underline">support@subliminalprime.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
