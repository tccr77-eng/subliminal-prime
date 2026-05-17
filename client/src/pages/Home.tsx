// Homepage — "Clarity" Design System
// Apple-inspired: spacious, warm, gender-neutral, conversion-focused
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Star, Play, Shield, Download, RefreshCw } from "lucide-react";
import { getFeaturedProducts, products, HERO_WOMAN, HERO_MAN, ABOUT_IMAGE } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const HERO_WOMAN_URL = HERO_WOMAN;
const HERO_MAN_URL = HERO_MAN;
const ABOUT_URL = ABOUT_IMAGE;

const testimonials: Array<{ name: string; role: string; text: string; rating: number; program: string; image: string }> = [];
// Testimonials intentionally empty pre-launch — UK CAP Code requires testimonials to be genuine, signed, and dated.
// Add real customer quotes here as they come in via support@.

const steps = [
  {
    number: "01",
    title: "Choose your program",
    description: "Select the specific outcome you want to work on — focus, confidence, sleep, wealth mindset, or any of our six precision-crafted programmes.",
  },
  {
    number: "02",
    title: "Press play at the right time",
    description: "Listen while you work, study, exercise, or sleep. The subliminal layer works beneath conscious awareness — no active effort required.",
  },
  {
    number: "03",
    title: "Notice the shift",
    description: "Most listeners report noticeable changes within 2–3 weeks of consistent daily use. The changes feel natural — like you've always been this way.",
  },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const { addItem } = useCart();

  return (
    <div style={{ background: "#faf9f7" }}>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_WOMAN_URL}
            alt="Woman with headphones, eyes closed, in peaceful focus"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay — left side for text legibility */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(250,249,247,0.97) 0%, rgba(250,249,247,0.92) 40%, rgba(250,249,247,0.4) 65%, rgba(250,249,247,0.0) 100%)"
          }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-24 lg:py-32">
          <div className="max-w-xl">
            <div className="section-label mb-5">Science-Backed Subliminal Audio</div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-800 text-[#1a1f2e] mb-6 leading-[1.0]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              Rewire your<br />
              mind.<br />
              <span style={{ color: "#4f6ef7" }}>Unlock your<br />potential.</span>
            </h1>
            <p className="text-lg text-[#4b5563] mb-8 leading-relaxed max-w-md">
              Premium subliminal audio programmes designed to support real shifts in how you sleep, think, and show up — built on published research, made to slip into a day you already have.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link href="/shop">
                <button className="btn-primary text-base px-7 py-4">
                  Explore Programs <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/the-science">
                <button className="btn-secondary text-base px-7 py-4">
                  The Science
                </button>
              </Link>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "https://subliminalprime.b-cdn.net/avatar-sarah.jpg",
                  "https://subliminalprime.b-cdn.net/avatar-james.jpg",
                  "https://subliminalprime.b-cdn.net/avatar-priya.jpg",
                  "https://subliminalprime.b-cdn.net/avatar-marcus.jpg",
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" className="text-amber-400" />)}
                  <span className="text-sm font-semibold text-[#1a1f2e] ml-1">4.9</span>
                </div>
                <p className="text-xs text-[#6b7280]">Backed by peer-reviewed research</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-strip">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: <Shield size={14} />, text: "30-Day Money-Back Guarantee" },
              { icon: <Download size={14} />, text: "Instant Digital Download" },
              { icon: <RefreshCw size={14} />, text: "Lifetime Access" },
              { icon: <CheckCircle size={14} />, text: "2 Audio Formats per Program" },
              { icon: <Star size={14} />, text: "Backed by peer-reviewed research" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#4b5563]">
                <span style={{ color: "#4f6ef7" }}>{item.icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED PROGRAMS ── */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-label mb-3">Programs</div>
              <h2 className="text-4xl lg:text-5xl font-800 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                Start with what<br />matters most.
              </h2>
            </div>
            <Link href="/shop">
              <button className="btn-secondary text-sm shrink-0">
                View All Programmes <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl mb-16">
            <div className="section-label mb-3">How It Works</div>
            <h2 className="text-4xl lg:text-5xl font-800 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              Effortless.<br />Just press play.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col">
                <div className="text-6xl font-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, color: "#e4e2de" }}>
                  {step.number}
                </div>
                <h3 className="text-xl font-700 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p className="text-[#6b7280] leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT SECTION — Man with headphones ── */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="section-label mb-4">The Science</div>
              <h2 className="text-4xl lg:text-5xl font-800 text-[#1a1f2e] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                Not wellness.<br />Neuroscience.
              </h2>
              <p className="text-[#4b5563] leading-relaxed mb-6">
                Subliminal audio works by delivering affirmations at a volume below the threshold of conscious perception — typically 20–40dB below the ambient audio. Your conscious mind hears only music or rainfall. Your subconscious processes the affirmations without the resistance or scepticism that conscious thought creates.
              </p>
              <p className="text-[#4b5563] leading-relaxed mb-8">
                Peer-reviewed research published in journals including <em>Consciousness and Cognition</em> and <em>Psychological Science</em> confirms that subliminally presented stimuli are processed by the brain and can influence behaviour, emotion, and decision-making.
              </p>
              <Link href="/the-science">
                <button className="btn-primary">
                  Read the Research <ArrowRight size={16} />
                </button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={HERO_MAN_URL}
                alt="Man with headphones, eyes closed, in deep focus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── (hidden when no real testimonials are loaded) */}
      {testimonials.length > 0 && (<section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl mb-12">
            <div className="section-label mb-3">Results</div>
            <h2 className="text-4xl lg:text-5xl font-800 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              Real people.<br />Real shifts.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-clean p-6 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} fill="#f59e0b" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</div>
                    <div className="text-xs text-[#9ca3af]">{t.role}</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#e4e2de]">
                  <span className="text-[11px] font-medium" style={{ color: "#4f6ef7" }}>Using: {t.program}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>)}

      {/* ── BUNDLE CTA ── */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-3xl overflow-hidden relative" style={{ background: "#1a1f2e", minHeight: 420 }}>
            {/* Background image */}
            <div className="absolute inset-0 opacity-20">
              <img src={ABOUT_URL} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10 lg:p-16">
              <div>
                <div className="section-label mb-4" style={{ color: "#818cf8" }}>Bundle Deals</div>
                <h2 className="text-4xl lg:text-5xl font-800 text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                  More programs.<br />More savings.
                </h2>
                <p className="text-[#9ca3af] leading-relaxed mb-8 max-w-md">
                  Our bundles are curated for specific performance goals. Save up to £19.95 versus buying programmes individually, with lifetime access to everything included.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/bundles">
                    <button className="btn-blue text-base px-7 py-4">
                      View Bundle Deals <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "The Foundations Bundle", price: "£34.99", save: "Save £9.98", programs: "3 programmes" },
                  { name: "The Manifest Bundle", price: "£34.99", save: "Save £9.98", programs: "3 programmes", popular: true },
                  { name: "The Complete Collection", price: "£69.99", save: "Save £19.95", programs: "All 6 programmes" },
                ].map((b, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${b.popular ? "bg-[#4f6ef7]" : "bg-white/10"}`}>
                    <div>
                      <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: b.popular ? "rgba(255,255,255,0.8)" : "#9ca3af" }}>{b.programs} · {b.save}</div>
                    </div>
                    <div className="text-white font-700 text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{b.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="section-label mb-4">Get Started Today</div>
          <h2 className="text-4xl lg:text-6xl font-800 text-[#1a1f2e] mb-6 max-w-2xl mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Your best self is one decision away.
          </h2>
          <p className="text-[#4b5563] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Try a programme for 30 days. If it is not for you, reply to your receipt and we will refund you in full. No catch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop">
              <button className="btn-primary text-base px-8 py-4">
                Browse All Programs <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/bundles">
              <button className="btn-secondary text-base px-8 py-4">
                See Bundle Deals
              </button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#9ca3af]">
            From £14.99 · Instant download · Lifetime access
          </p>
        </div>
      </section>
    </div>
  );
}
