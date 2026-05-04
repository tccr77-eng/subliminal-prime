// Order Confirmation Page — "Clarity" Design System
import { Link } from "wouter";
import { CheckCircle, Download, Mail, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
  return (
    <div style={{ background: "#faf9f7" }} className="pt-16 min-h-screen flex items-center">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 w-full">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#dcfce7" }}>
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Order confirmed!
          </h1>
          <p className="text-[#4b5563] text-lg mb-8 leading-relaxed">
            Thank you for your purchase. Your download links have been sent to your email address. Check your inbox — and your spam folder just in case.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {[
              { icon: <Mail size={20} />, title: "Check your email", desc: "Download links sent immediately to your inbox." },
              { icon: <Download size={20} />, title: "Download your programs", desc: "Save them to your device for offline listening." },
              { icon: <CheckCircle size={20} />, title: "Press play and begin", desc: "Listen once daily for best results. Most people notice shifts within 2–3 weeks." },
            ].map((step, i) => (
              <div key={i} className="card-clean p-5 flex items-start gap-4 text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#e8ecff" }}>
                  <span style={{ color: "#4f6ef7" }}>{step.icon}</span>
                </div>
                <div>
                  <h4 className="font-700 text-[#1a1f2e] text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{step.title}</h4>
                  <p className="text-xs text-[#6b7280]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/how-to-use">
              <button className="btn-primary">How to Get the Best Results <ArrowRight size={16} /></button>
            </Link>
            <Link href="/shop">
              <button className="btn-secondary">Browse More Programs</button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-[#9ca3af]">
            Questions? Email us at <a href="mailto:support@subliminalprime.com" className="underline">support@subliminalprime.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
