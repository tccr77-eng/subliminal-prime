// ProductCard — "Clarity" Design System
// Clean white card with hover lift, used across Shop and Homepage
import { Link } from "wouter";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.cardImage,
      type: "product",
    });
    toast.success(`${product.name} added to cart`, {
      description: "Two audio formats included.",
      duration: 2500,
    });
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="card-clean group cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", background: "#f2f0ec" }}>
          <img
            src={product.cardImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.bestseller && (
              <span className="inline-flex items-center gap-1 bg-white text-[#1a1f2e] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <Star size={9} fill="currentColor" /> Bestseller
              </span>
            )}
            {product.new && (
              <span className="inline-flex items-center bg-[#4f6ef7] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                New
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="section-label mb-2">{product.category}</div>
          <h3 className="text-lg font-700 text-[#1a1f2e] mb-1 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
            {product.name}
          </h3>
          <p className="text-sm text-[#6b7280] leading-relaxed flex-1 mb-4">
            {product.tagline}
          </p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-xl font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                £{product.price.toFixed(2)}
              </span>
              <p className="text-[11px] text-[#9ca3af] mt-0.5">2 audio formats included</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200 ${
                inCart
                  ? "bg-[#f2f0ec] text-[#6b7280]"
                  : "bg-[#1a1f2e] text-white hover:bg-[#2d3348] hover:shadow-lg"
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <ShoppingBag size={14} />
              {inCart ? "In Cart" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
