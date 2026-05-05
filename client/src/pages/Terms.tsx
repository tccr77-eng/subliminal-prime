// Terms of Service Page
export default function Terms() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl">
          <div className="section-label mb-4">Legal</div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Terms of Service</h1>
          <p className="text-sm text-[#9ca3af] mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          <div className="prose prose-sm max-w-none text-[#4b5563] leading-relaxed space-y-6">
            <p>By purchasing from Subliminal Prime, you agree to these terms. Please read them carefully.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Digital products</h2>
            <p>All products are digital downloads. Upon purchase, you receive a personal, non-transferable licence to use the audio files for your own personal use. You may not redistribute, resell, or share the files with others.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Intellectual property</h2>
            <p>All audio content, branding, and website materials are the intellectual property of Subliminal Prime. Unauthorised reproduction or distribution is prohibited.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Disclaimer</h2>
            <p>Subliminal Prime programs are intended as personal development tools. They are not a substitute for professional medical, psychological, or financial advice. Results vary between individuals. We make no guarantee of specific outcomes.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Limitation of liability</h2>
            <p>To the maximum extent permitted by law, Subliminal Prime shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Governing law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>
            <h2 className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:support@subliminalprime.com" className="underline">support@subliminalprime.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
