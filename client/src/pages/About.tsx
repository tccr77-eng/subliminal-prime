// About Page — "Clarity" Design System
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ABOUT_IMAGE, HERO_WOMAN } from "@/lib/products";

export default function About() {
  return (
    <div style={{ background: "#faf9f7" }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
        <div className="absolute inset-0">
          <img src={ABOUT_IMAGE} alt="Man and woman with headphones in a minimal space" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(250,249,247,0.95) 0%, rgba(250,249,247,0.8) 50%, rgba(250,249,247,0.2) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
          <div className="max-w-lg">
            <div className="section-label mb-4">Our Story</div>
            <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              Built for people who take their performance seriously.
            </h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl font-800 text-[#1a1f2e] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                Why we built Subliminal Prime
              </h2>
              <p className="text-[#4b5563] leading-relaxed mb-5">
                Subliminal Prime was created out of a simple frustration: the subliminal audio market was full of vague promises, poor production quality, and zero scientific rigour. We decided to do it properly.
              </p>
              <p className="text-[#4b5563] leading-relaxed mb-5">
                We believe that the gap between where you are and where you want to be is largely a function of your subconscious programming — the deeply held beliefs, automatic responses, and default thought patterns that run beneath conscious awareness.
              </p>
              <p className="text-[#4b5563] leading-relaxed">
                Subliminal Prime exists to give driven, ambitious people a scientifically credible tool for updating that programming. Not as a replacement for hard work, discipline, or skill development — but as a powerful complement to all of it.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={HERO_WOMAN} alt="Woman with headphones in peaceful focus" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10", label: "Performance Programs" },
              { number: "2", label: "Audio Formats per Program" },
              { number: "30", label: "Day Money-Back Guarantee" },
              { number: "10k+", label: "Satisfied Customers" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-800 text-[#1a1f2e] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>{stat.number}</div>
                <div className="text-sm text-[#6b7280]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-4xl font-800 text-[#1a1f2e] mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Scientific Rigour", desc: "We only make claims we can support with peer-reviewed research. Every program is grounded in published neuroscience, not wellness trends." },
              { title: "Performance Focus", desc: "Subliminal Prime is built for people who want measurable results. Our programs target specific, high-value performance outcomes." },
              { title: "Uncompromising Quality", desc: "Every audio program is produced to broadcast standard. The subliminal layer is precisely calibrated, and the ambient backgrounds are carefully selected." },
            ].map((v, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: "#f2f0ec" }}>
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center" style={{ background: "#e8ecff" }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: "#4f6ef7" }} />
                </div>
                <h3 className="text-xl font-700 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{v.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl font-800 text-[#1a1f2e] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Ready to start?</h2>
          <p className="text-[#4b5563] mb-8 max-w-md mx-auto">Browse our library of 10 precision-crafted subliminal programs and find the one that fits your goals.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop"><button className="btn-primary">Browse Programs <ArrowRight size={16} /></button></Link>
            <Link href="/the-science"><button className="btn-secondary">Read the Science</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
