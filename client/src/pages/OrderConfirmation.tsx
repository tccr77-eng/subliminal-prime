// Order Confirmation Page — "Clarity" Design System
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle, Download, Mail, ArrowRight, FileAudio, ExternalLink } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/products";

interface OrderItem {
  id: string;
  name: string;
  slug: string;
  downloadUrl: string;
}

// Simulated download links — in production these would come from the backend after payment verification
const DOWNLOAD_LINKS: Record<string, string> = {
  "elite-focus": "https://subliminalprime.com/downloads/elite-focus.mp3",
  "unshakeable-confidence": "https://subliminalprime.com/downloads/unshakeable-confidence.mp3",
  "wealth-abundance": "https://subliminalprime.com/downloads/wealth-abundance.mp3",
  "entrepreneurial-mindset": "https://subliminalprime.com/downloads/entrepreneurial-mindset.mp3",
  "peak-athletic-performance": "https://subliminalprime.com/downloads/peak-athletic-performance.mp3",
  "accelerated-learning": "https://subliminalprime.com/downloads/accelerated-learning.mp3",
  "master-public-speaking": "https://subliminalprime.com/downloads/master-public-speaking.mp3",
  "deep-sleep": "https://subliminalprime.com/downloads/deep-sleep.mp3",
  "social-charisma": "https://subliminalprime.com/downloads/social-charisma.mp3",
  "stress-resilience": "https://subliminalprime.com/downloads/stress-resilience.mp3",
};

export default function OrderConfirmation() {
  const { items, clearCart } = useCart();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderNumber] = useState(() => `SP-${Date.now().toString(36).toUpperCase()}`);

  useEffect(() => {
    // Capture the order items before clearing the cart
    if (items.length > 0) {
      const captured: OrderItem[] = items.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
          id: item.id,
          name: item.name,
          slug: product?.slug || item.id,
          downloadUrl: DOWNLOAD_LINKS[product?.slug || item.id] || "#",
        };
      });
      setOrderItems(captured);
      // Clear the cart after capturing
      clearCart();
    } else {
      // If page is refreshed or accessed directly, show a generic confirmation
      setOrderItems([]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ background: "#faf9f7" }} className="min-h-screen">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 w-full">
        <div className="max-w-2xl mx-auto">

          {/* Success header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#dcfce7" }}>
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase mb-3">Order Confirmed</p>
            <h1 className="text-4xl font-bold text-stone-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your programs are ready
            </h1>
            <p className="text-stone-500 text-lg">
              Order <span className="font-semibold text-stone-700">{orderNumber}</span> — download links are below and have also been sent to your email.
            </p>
          </div>

          {/* Download section */}
          {orderItems.length > 0 ? (
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-stone-100 flex items-center gap-3">
                <Download className="w-5 h-5 text-indigo-600" />
                <h2 className="font-semibold text-stone-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Your Downloads ({orderItems.length} {orderItems.length === 1 ? "program" : "programs"})
                </h2>
              </div>
              <div className="divide-y divide-stone-50">
                {orderItems.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#e8ecff" }}>
                        <FileAudio className="w-5 h-5" style={{ color: "#4f6ef7" }} />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.name}</p>
                        <p className="text-xs text-stone-400">MP3 Audio Program</p>
                      </div>
                    </div>
                    <a
                      href={item.downloadUrl}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shrink-0"
                      onClick={(e) => {
                        // In demo mode, prevent actual navigation and show a toast-style message
                        e.preventDefault();
                        alert(`In the live version, this would download: ${item.name}.mp3\n\nPayment processing (Stripe) must be enabled for real downloads.`);
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-100">
                <p className="text-xs text-stone-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  Download links have also been sent to your email address. Links are valid for 30 days.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 mb-8 text-center">
              <Mail className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="font-semibold text-stone-900 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Check your email</h3>
              <p className="text-stone-500 text-sm">Your download links have been sent to your email address. Check your inbox — and your spam folder just in case.</p>
            </div>
          )}

          {/* Next steps */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Getting started</h2>
            </div>
            <div className="divide-y divide-stone-50">
              {[
                { step: "01", title: "Save your files", desc: "Download your programs to your phone or computer for offline access." },
                { step: "02", title: "Listen once daily", desc: "30–60 minutes per session. Morning or night — whichever you prefer." },
                { step: "03", title: "Be consistent", desc: "Most people notice meaningful shifts within 2–3 weeks of daily listening." },
              ].map((s) => (
                <div key={s.step} className="px-6 py-4 flex items-start gap-4">
                  <span className="text-xs font-bold text-indigo-600 mt-0.5 shrink-0 w-6">{s.step}</span>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</p>
                    <p className="text-xs text-stone-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/how-to-use">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                How to Get the Best Results <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/shop">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm bg-white">
                Browse More Programs
              </button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-stone-400 text-center">
            Questions? Email us at{" "}
            <a href="mailto:support@subliminalprime.com" className="text-indigo-600 hover:text-indigo-700 underline">
              support@subliminalprime.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
