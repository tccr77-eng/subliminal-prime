// Shop Page — "Clarity" Design System
import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Performance", "Mindset", "Communication", "Wellbeing"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ background: "#faf9f7" }}>
      {/* Header */}
      <section className="section-py pb-12" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="section-label mb-4">All Programs</div>
          <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Find your program.
          </h1>
          <p className="text-[#4b5563] text-lg max-w-xl leading-relaxed">
            Ten precision-crafted subliminal audio programs. Each one targets a specific, high-value performance outcome. Every program includes two audio formats — Soft Piano Music and Rainfall.
          </p>
        </div>
      </section>

      {/* Filter bar — sticky below fixed header (announcement 40px + nav 72px = 112px) */}
      <div className="sticky top-[112px] z-30 bg-white/90 backdrop-blur-xl border-b border-[#e4e2de]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1a1f2e] text-white"
                    : "bg-[#f2f0ec] text-[#6b7280] hover:bg-[#e4e2de]"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-sm text-[#9ca3af]">{filtered.length} programs</span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle upsell */}
      <section className="pb-20">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6" style={{ background: "#1a1f2e" }}>
            <div>
              <h3 className="text-2xl lg:text-3xl font-700 text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                Want more than one program?
              </h3>
              <p className="text-[#9ca3af] text-sm">Save up to £49.91 with our curated bundles.</p>
            </div>
            <a href="/bundles">
              <button className="btn-blue shrink-0">
                View Bundle Deals →
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
