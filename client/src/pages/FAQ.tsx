// FAQ Page — "Clarity" Design System
import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    category: "How It Works",
    items: [
      { q: "What is subliminal audio?", a: "Subliminal audio delivers affirmations at a volume below the threshold of conscious perception — typically 20–40dB below the ambient audio. Your conscious mind hears only music or rainfall. Your subconscious processes the affirmations without the resistance or scepticism that conscious thought creates." },
      { q: "Is there scientific evidence that subliminal audio works?", a: "Yes. Peer-reviewed research published in journals including Consciousness and Cognition, Psychological Science, and the Journal of Experimental Psychology confirms that subliminally presented stimuli are processed by the brain and can influence behaviour, emotion, and decision-making. Visit our Science page for specific studies." },
      { q: "How long until I notice results?", a: "Most listeners report noticeable shifts within 2–3 weeks of consistent daily use. More profound changes typically emerge over 60–90 days. Like physical training, the effects accumulate over time — consistency is the key variable." },
      { q: "How should I listen?", a: "Listen once daily for best results. You can listen while working, studying, exercising, commuting, or sleeping. The subliminal layer works regardless of whether you're actively paying attention. We recommend choosing the format (piano or rainfall) that best suits your activity." },
    ],
  },
  {
    category: "Programs & Products",
    items: [
      { q: "What's included in each program?", a: "Every program includes two 60-minute audio tracks: one with a Soft Piano Music background and one with a Rainfall background. Both contain the same subliminal affirmation layer. You receive both formats with every purchase." },
      { q: "Can I listen to multiple programs at once?", a: "We recommend starting with one program and using it consistently for 30 days before adding another. This allows you to clearly observe the effects of each program. After 30 days, you can layer programs if you wish." },
      { q: "What format are the audio files?", a: "All programs are delivered as high-quality MP3 files (320kbps). They are compatible with all devices, apps, and audio players." },
      { q: "Can I listen on any device?", a: "Yes. The MP3 files work on any device — iPhone, Android, computer, tablet, smart speaker, or any audio player. You can also download them to listen offline." },
    ],
  },
  {
    category: "Orders & Delivery",
    items: [
      { q: "How do I receive my programs after purchase?", a: "Immediately after payment, you'll receive an email with download links for your programs. Downloads are available instantly — there's no waiting period." },
      { q: "Is my purchase a one-time payment?", a: "Yes. Every program is a one-time payment with lifetime access. There are no subscriptions, recurring charges, or hidden fees." },
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as Apple Pay and Google Pay." },
      { q: "Is my payment secure?", a: "Yes. All payments are processed through Stripe, which uses bank-level 256-bit SSL encryption. We never store your card details." },
    ],
  },
  {
    category: "Refunds & Support",
    items: [
      { q: "What is your refund policy?", a: "We offer a 30-day money-back guarantee on all programs and bundles. If you're not satisfied for any reason within 30 days of purchase, contact us at support@subliminalprime.com for a full refund — no questions asked." },
      { q: "I haven't received my download email. What should I do?", a: "Check your spam or junk folder first. If it's not there, email us at support@subliminalprime.com with your order details and we'll resend the download link immediately." },
      { q: "Can I re-download my programs if I lose them?", a: "Yes. Your download links remain active for 12 months after purchase. If you need access after that period, contact us and we'll provide fresh links." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e4e2de] last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(v => !v)}
      >
        <span className="font-600 text-[#1a1f2e] text-sm leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-[#6b7280] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-[#4b5563] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div style={{ background: "#faf9f7" }} className="pt-16">
      <section className="section-py pb-12" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="section-label mb-4">Help Centre</div>
          <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Frequently asked<br />questions.
          </h1>
          <p className="text-[#4b5563] text-lg max-w-xl">Can't find your answer? Email us at <a href="mailto:support@subliminalprime.com" className="underline">support@subliminalprime.com</a></p>
        </div>
      </section>

      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {faqs.map((section, i) => (
              <div key={i} className="mb-12">
                <h2 className="text-xl font-700 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{section.category}</h2>
                <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #e4e2de" }}>
                  <div className="px-6">
                    {section.items.map((item, j) => <FAQItem key={j} q={item.q} a={item.a} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-3xl">
            <div className="p-8 rounded-2xl" style={{ background: "#1a1f2e" }}>
              <h3 className="text-xl font-700 text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Still have questions?</h3>
              <p className="text-[#9ca3af] text-sm mb-5">Our support team typically responds within 2 hours on business days.</p>
              <a href="mailto:support@subliminalprime.com">
                <button className="btn-blue">Email Support <ArrowRight size={16} /></button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
