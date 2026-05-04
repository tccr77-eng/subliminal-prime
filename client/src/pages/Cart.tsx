// Cart Page — "Clarity" Design System
import { Link } from "wouter";
import { Trash2, ArrowRight, ShoppingBag, Shield, Download } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ background: "#faf9f7" }} className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#f2f0ec" }}>
            <ShoppingBag size={32} className="text-[#9ca3af]" />
          </div>
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Your cart is empty</h2>
          <p className="text-[#6b7280] mb-8">Discover our library of 10 subliminal audio programs.</p>
          <Link href="/shop"><button className="btn-primary">Browse Programs <ArrowRight size={16} /></button></Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#faf9f7" }} className="pt-16">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        <h1 className="text-4xl font-800 text-[#1a1f2e] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
          Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <div key={item.id} className="card-clean p-5 flex items-center gap-5">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center text-3xl" style={{ background: "#f2f0ec" }}>
                    🎧
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-700 text-[#1a1f2e] text-base" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{item.name}</h3>
                  <p className="text-xs text-[#9ca3af] mt-0.5">{item.type === "bundle" ? "Bundle" : "2 audio formats · Lifetime access"}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-lg font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                    £{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} className="text-[#9ca3af] hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card-clean p-7 sticky top-24">
              <h3 className="text-xl font-700 text-[#1a1f2e] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Order Summary</h3>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Subtotal</span>
                  <span className="font-semibold text-[#1a1f2e]">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Delivery</span>
                  <span className="font-semibold text-green-600">Free (Digital)</span>
                </div>
                <div className="border-t border-[#e4e2de] pt-3 flex justify-between">
                  <span className="font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Total</span>
                  <span className="font-700 text-[#1a1f2e] text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>£{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <button className="btn-primary w-full justify-center text-base py-4">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </Link>
              <div className="mt-5 flex flex-col gap-2">
                {[
                  { icon: <Shield size={13} />, text: "256-bit SSL encryption" },
                  { icon: <Download size={13} />, text: "Instant digital delivery" },
                  { icon: <Shield size={13} />, text: "30-day money-back guarantee" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#9ca3af]">
                    <span style={{ color: "#4f6ef7" }}>{t.icon}</span> {t.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
