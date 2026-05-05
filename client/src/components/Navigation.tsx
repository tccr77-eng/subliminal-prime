// Navigation — "Clarity" Design System
// Apple-inspired: clean, minimal, translucent on scroll
// Dynamically offsets below the announcement bar when it is visible
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAnnouncement } from "@/contexts/AnnouncementContext";

const ANNOUNCEMENT_H = 40; // px — must match AnnouncementBar height
const NAV_H_MOBILE = 64;   // h-16
const NAV_H_DESKTOP = 72;  // lg:h-[72px]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const [location] = useLocation();
  const { visible: announcementVisible } = useAnnouncement();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const topOffset = announcementVisible ? ANNOUNCEMENT_H : 0;

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/bundles", label: "Bundles" },
    { href: "/the-science", label: "The Science" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        style={{ top: `${topOffset}px` }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[#e4e2de] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/">
              <span
                className="font-display text-xl tracking-tight text-[#1a1f2e] cursor-pointer select-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}
              >
                Subliminal<span style={{ color: "#4f6ef7" }}>Prime</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`text-sm font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-[#1a1f2e]"
                        : "text-[#6b7280] hover:text-[#1a1f2e]"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link href="/cart">
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f2f0ec] transition-colors">
                  <ShoppingBag size={20} className="text-[#1a1f2e]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#4f6ef7] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </button>
              </Link>

              {/* Shop CTA — desktop */}
              <Link href="/shop" className="hidden md:block">
                <button className="btn-primary text-sm py-2.5 px-5">
                  Shop Now
                </button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f2f0ec] transition-colors"
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-white"
          style={{ paddingTop: `${topOffset + NAV_H_MOBILE}px` }}
        >
          <div className="flex flex-col px-6 py-8 gap-2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <span
                  className="block py-4 text-2xl text-[#1a1f2e] border-b border-[#e4e2de] cursor-pointer"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="mt-6">
              <Link href="/shop">
                <button className="btn-primary w-full justify-center text-base py-4">
                  Shop All Programs
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
