// Checkout Page — "Clarity" Design System
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Lock, ChevronLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", address: "", city: "", postcode: "", country: "GB", card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.includes("@")) e.email = "Please enter a valid email address.";
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.postcode.trim()) e.postcode = "Postcode is required.";
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Please enter a valid card number.";
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format: MM/YY";
    if (form.cvc.length < 3) e.cvc = "Invalid CVC.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    navigate("/order-confirmation");
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  if (items.length === 0) {
    return (
      <div style={{ background: "#faf9f7" }} className="min-h-screen flex items-center justify-center">
        <div className="text-center px-5">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Nothing to check out</h2>
          <Link href="/shop"><button className="btn-primary">Browse Programs</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#faf9f7" }}>
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        <Link href="/cart">
          <button className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#1a1f2e] transition-colors mb-8">
            <ChevronLeft size={16} /> Back to Cart
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Checkout</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Contact */}
              <div className="card-clean p-7">
                <h3 className="font-700 text-[#1a1f2e] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">First Name</label>
                    <input className={`input-field ${errors.firstName ? "border-red-400" : ""}`} value={form.firstName} onChange={e => handleChange("firstName", e.target.value)} placeholder="Sarah" />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Last Name</label>
                    <input className={`input-field ${errors.lastName ? "border-red-400" : ""}`} value={form.lastName} onChange={e => handleChange("lastName", e.target.value)} placeholder="Johnson" />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Address</label>
                    <input className={`input-field ${errors.address ? "border-red-400" : ""}`} value={form.address} onChange={e => handleChange("address", e.target.value)} placeholder="123 High Street" />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">City</label>
                    <input className={`input-field ${errors.city ? "border-red-400" : ""}`} value={form.city} onChange={e => handleChange("city", e.target.value)} placeholder="London" />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Postcode</label>
                    <input className={`input-field ${errors.postcode ? "border-red-400" : ""}`} value={form.postcode} onChange={e => handleChange("postcode", e.target.value.toUpperCase())} placeholder="SW1A 1AA" />
                    {errors.postcode && <p className="text-xs text-red-500 mt-1">{errors.postcode}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Country</label>
                    <select className="input-field" value={form.country} onChange={e => handleChange("country", e.target.value)}>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="IE">Ireland</option>
                      <option value="NZ">New Zealand</option>
                      <option value="ZA">South Africa</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email Address</label>
                    <input className={`input-field ${errors.email ? "border-red-400" : ""}`} type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} placeholder="sarah@example.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    <p className="text-xs text-[#9ca3af] mt-1">Your download links will be sent here.</p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="card-clean p-7">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Payment Details</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                    <Lock size={12} /> Secured by Stripe
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Card Number</label>
                    <input className={`input-field font-mono ${errors.card ? "border-red-400" : ""}`} value={form.card} onChange={e => handleChange("card", formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} />
                    {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">Expiry Date</label>
                      <input className={`input-field font-mono ${errors.expiry ? "border-red-400" : ""}`} value={form.expiry} onChange={e => handleChange("expiry", formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} />
                      {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">CVC</label>
                      <input className={`input-field font-mono ${errors.cvc ? "border-red-400" : ""}`} value={form.cvc} onChange={e => handleChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" maxLength={4} />
                      {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Lock size={16} /> Complete Purchase — £{subtotal.toFixed(2)}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-[#9ca3af]">
                By completing your purchase you agree to our <Link href="/terms"><span className="underline cursor-pointer">Terms of Service</span></Link> and <Link href="/privacy-policy"><span className="underline cursor-pointer">Privacy Policy</span></Link>.
              </p>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="card-clean p-7 sticky top-24">
              <h3 className="font-700 text-[#1a1f2e] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Order Summary</h3>
              <div className="flex flex-col gap-3 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center text-xl" style={{ background: "#f2f0ec" }}>🎧</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1a1f2e] truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.name}</p>
                      <p className="text-xs text-[#9ca3af]">{item.type === "bundle" ? "Bundle" : "2 formats"}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1a1f2e] shrink-0">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e4e2de] pt-4 flex justify-between">
                <span className="font-700 text-[#1a1f2e]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Total</span>
                <span className="font-700 text-[#1a1f2e] text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-5 pt-5 border-t border-[#e4e2de] flex flex-col gap-2">
                {[
                  { icon: <Shield size={13} />, text: "30-day money-back guarantee" },
                  { icon: <Lock size={13} />, text: "256-bit SSL encryption" },
                  { icon: <CheckCircle size={13} />, text: "Instant digital delivery" },
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
