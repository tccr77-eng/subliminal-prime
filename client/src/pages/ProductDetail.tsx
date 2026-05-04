// Product Detail Page — "Clarity" Design System
import { useParams, Link } from "wouter";
import { ShoppingBag, CheckCircle, ArrowRight, Star, ChevronLeft, Music, CloudRain } from "lucide-react";
import { getProductBySlug, products } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem, isInCart } = useCart();

  if (!product) {
    return (
      <div className="pt-32 text-center min-h-screen flex flex-col items-center justify-center" style={{ background: "#faf9f7" }}>
        <h1 className="text-3xl font-700 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Program not found</h1>
        <Link href="/shop"><button className="btn-primary">Browse All Programs</button></Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.cardImage, type: "product" });
    toast.success(`${product.name} added to cart`, { description: "Two audio formats included.", duration: 2500 });
  };

  return (
    <div style={{ background: "#faf9f7" }} className="pt-16">
      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-4">
        <Link href="/shop">
          <button className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#1a1f2e] transition-colors">
            <ChevronLeft size={16} /> All Programs
          </button>
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden sticky top-24" style={{ aspectRatio: "3/4", background: "#f2f0ec" }}>
            <img src={product.cardImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="py-4">
            <div className="section-label mb-3">{product.category}</div>
            <h1 className="text-4xl lg:text-5xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              {product.name}
            </h1>
            <p className="text-xl text-[#4b5563] mb-6 leading-relaxed">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" className="text-amber-400" />)}
              </div>
              <span className="text-sm font-semibold text-[#1a1f2e]">4.9</span>
              <span className="text-sm text-[#9ca3af]">(127 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-800 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                £{product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#9ca3af]">One-time payment · Lifetime access</span>
            </div>

            {/* Formats included */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#1a1f2e]" style={{ background: "#f2f0ec" }}>
                <Music size={15} style={{ color: "#4f6ef7" }} /> Soft Piano Music
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#1a1f2e]" style={{ background: "#f2f0ec" }}>
                <CloudRain size={15} style={{ color: "#4f6ef7" }} /> Rainfall
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 text-base font-semibold py-4 px-6 rounded-full transition-all duration-200 ${
                  inCart ? "bg-[#f2f0ec] text-[#6b7280]" : "bg-[#1a1f2e] text-white hover:bg-[#2d3348] hover:shadow-xl"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <ShoppingBag size={18} />
                {inCart ? "Added to Cart" : "Add to Cart — £" + product.price.toFixed(2)}
              </button>
              {inCart && (
                <Link href="/cart">
                  <button className="btn-blue flex-1 justify-center py-4">
                    View Cart <ArrowRight size={16} />
                  </button>
                </Link>
              )}
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-2 mb-8">
              {["30-day money-back guarantee", "Instant digital download", "Lifetime access to both formats", "No subscription — pay once"].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#4b5563]">
                  <CheckCircle size={15} style={{ color: "#4f6ef7" }} /> {t}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-[#e4e2de] pt-8">
              <h3 className="text-lg font-700 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>About this program</h3>
              <p className="text-[#4b5563] leading-relaxed text-sm">{product.longDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                What you'll experience
              </h2>
              <div className="flex flex-col gap-4">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#e8ecff" }}>
                      <CheckCircle size={13} style={{ color: "#4f6ef7" }} />
                    </div>
                    <p className="text-[#374151] text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                This program is for you if…
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.forWho.map((who, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-sm font-medium text-[#1a1f2e]" style={{ background: "white", border: "1px solid #e4e2de" }}>
                    {who}
                  </span>
                ))}
              </div>
              <div className="mt-10 p-6 rounded-2xl" style={{ background: "white" }}>
                <h4 className="font-700 text-[#1a1f2e] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>What's included</h4>
                <ul className="space-y-2">
                  {product.tracks.map((track, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#4b5563]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4f6ef7]" />
                      {track} · {product.duration}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-py">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
