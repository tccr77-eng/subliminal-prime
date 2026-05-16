// Footer — "Clarity" Design System
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1f2e" }} className="text-white">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display font-800 text-xl tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              Subliminal<span style={{ color: "#4f6ef7" }}>Prime</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
              Science-backed subliminal audio programs engineered for people who take their performance seriously.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs" style={{ color: "#9ca3af" }}>30-Day Money-Back Guarantee</span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e5e7eb" }}>Programs</h4>
            <ul className="space-y-3">
              {[
                { href: "/product/deep-sleep", label: "Deep Sleep" },
                { href: "/product/calm-clarity", label: "Calm & Clarity" },
                { href: "/product/wealth-magnet", label: "Wealth Magnet" },
                { href: "/product/unstoppable-confidence", label: "Unstoppable Confidence" },
                { href: "/bundles", label: "Bundle Deals" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm transition-colors cursor-pointer hover:text-white" style={{ color: "#9ca3af" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e5e7eb" }}>Company</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/the-science", label: "The Science" },
                { href: "/faq", label: "FAQ" },
                { href: "/how-to-use", label: "How to Use" },
                { href: "/blog", label: "The Journal" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm transition-colors cursor-pointer hover:text-white" style={{ color: "#9ca3af" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e5e7eb" }}>Support</h4>
            <ul className="space-y-3">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/faq", label: "Help Centre" },
                { href: "/refund-policy", label: "Refund Policy" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm transition-colors cursor-pointer hover:text-white" style={{ color: "#9ca3af" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a href="mailto:support@subliminalprime.com" className="text-sm hover:text-white transition-colors" style={{ color: "#9ca3af" }}>
                support@subliminalprime.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            © {new Date().getFullYear()} Subliminal Prime. All rights reserved.
          </p>
          <p className="text-xs text-center" style={{ color: "#6b7280" }}>
            Results may vary. Subliminal audio is a complementary tool, not a substitute for professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
