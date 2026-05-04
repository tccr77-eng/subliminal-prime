// Bundles Page — "Clarity" Design System
import { Link } from "wouter";
import { CheckCircle, ArrowRight, ShoppingBag, Star } from "lucide-react";
import { bundles, getProductById } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function Bundles() {
  const { addItem, isInCart } = useCart();

  const handleAddBundle = (bundle: typeof bundles[0]) => {
    addItem({ id: bundle.id, name: bundle.name, price: bundle.price, image: "", type: "bundle" });
    toast.success(`${bundle.name} added to cart`, { description: `Save £${bundle.savings.toFixed(2)} vs. buying individually.`, duration: 3000 });
  };

  return (
    <div style={{ background: "#faf9f7" }} className="pt-16">
      {/* Header */}
      <section className="section-py pb-12" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="section-label mb-4">Bundle Deals</div>
          <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            More programs.<br />More savings.
          </h1>
          <p className="text-[#4b5563] text-lg max-w-xl leading-relaxed">
            Our bundles are curated for specific performance goals. Save significantly versus buying programs individually — with lifetime access to everything included.
          </p>
        </div>
      </section>

      {/* Bundles */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8">
            {bundles.map((bundle, idx) => {
              const inCart = isInCart(bundle.id);
              const includedProducts = bundle.products.map(id => getProductById(id)).filter(Boolean);
              const isPopular = bundle.badge === "Most Popular";
              const isBestValue = bundle.badge === "Best Value";

              return (
                <div
                  key={bundle.id}
                  className={`rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                    isPopular ? "border-[#4f6ef7]" : "border-[#e4e2de]"
                  }`}
                  style={{ background: "white" }}
                >
                  {/* Badge bar */}
                  {bundle.badge && (
                    <div
                      className="px-8 py-3 flex items-center gap-2"
                      style={{ background: isPopular ? "#4f6ef7" : "#1a1f2e" }}
                    >
                      <Star size={13} fill="white" className="text-white" />
                      <span className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {bundle.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      {/* Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4 mb-4">
                          <span className="text-4xl">{bundle.emoji}</span>
                          <div>
                            <h2 className="text-2xl lg:text-3xl font-800 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                              {bundle.name}
                            </h2>
                            <p className="text-[#6b7280] mt-1">{bundle.tagline}</p>
                          </div>
                        </div>
                        <p className="text-[#4b5563] leading-relaxed mb-6 text-sm">{bundle.description}</p>

                        {/* Programs included */}
                        <div className="flex flex-wrap gap-2">
                          {includedProducts.map((p, i) => p && (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm" style={{ background: "#f2f0ec" }}>
                              <span>{p.emoji}</span>
                              <span className="font-medium text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing + CTA */}
                      <div className="flex flex-col items-start lg:items-end gap-4">
                        <div className="text-right">
                          <div className="flex items-baseline gap-2 justify-end">
                            <span className="text-4xl font-800 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                              £{bundle.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-sm text-[#9ca3af] line-through">£{bundle.originalPrice.toFixed(2)}</div>
                          <div className="mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" style={{ background: "#dcfce7", color: "#16a34a" }}>
                            Save £{bundle.savings.toFixed(2)}
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddBundle(bundle)}
                          className={`w-full lg:w-auto flex items-center justify-center gap-2 text-base font-semibold py-4 px-8 rounded-full transition-all duration-200 ${
                            inCart
                              ? "bg-[#f2f0ec] text-[#6b7280]"
                              : isPopular
                              ? "bg-[#4f6ef7] text-white hover:bg-[#3b55e0] hover:shadow-xl"
                              : "bg-[#1a1f2e] text-white hover:bg-[#2d3348] hover:shadow-xl"
                          }`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          <ShoppingBag size={18} />
                          {inCart ? "Added to Cart" : "Add Bundle to Cart"}
                        </button>

                        <div className="flex flex-col gap-1.5 w-full lg:items-end">
                          {["Instant download", "Lifetime access", "30-day guarantee"].map((t, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                              <CheckCircle size={12} style={{ color: "#4f6ef7" }} /> {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Bundle FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {[
              { q: "Do bundles include both audio formats?", a: "Yes. Every program in every bundle includes both the Soft Piano Music and Rainfall versions at no extra cost." },
              { q: "Can I use a discount code on bundles?", a: "Discount codes can be applied at checkout. Note that bundles are already discounted versus individual prices." },
              { q: "What if I already own some programs?", a: "Contact us at support@subliminalprime.com and we'll arrange a custom discount for the programs you don't yet own." },
              { q: "Is there a money-back guarantee?", a: "Yes — all bundles are covered by our 30-day money-back guarantee. No questions asked." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: "white" }}>
                <h4 className="font-700 text-[#1a1f2e] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{item.q}</h4>
                <p className="text-sm text-[#6b7280] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
