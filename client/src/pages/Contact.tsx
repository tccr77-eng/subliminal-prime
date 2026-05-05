import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase mb-4">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            We're here to help
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Have a question about your order, a product, or just want to say hello? We typically respond within 24 hours on business days.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">

            {/* Info cards */}
            <div className="space-y-6">
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email Support</h3>
                <p className="text-sm text-stone-500 mb-3">For all enquiries, orders, and technical questions.</p>
                <a href="mailto:support@subliminalprime.com" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  support@subliminalprime.com
                </a>
              </div>

              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Response Time</h3>
                <p className="text-sm text-stone-500">
                  We aim to respond to all enquiries within <strong className="text-stone-700">24 hours</strong> on business days (Monday–Friday).
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Common Questions</h3>
                <p className="text-sm text-stone-500 mb-3">Many answers are already in our FAQ — it's worth checking first.</p>
                <a href="/faq" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  Visit the FAQ →
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="md:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message received
                  </h2>
                  <p className="text-stone-500 max-w-sm">
                    Thank you for getting in touch. We'll get back to you at <strong className="text-stone-700">{form.email}</strong> within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "general", message: "" }); }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Full name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Email address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                    >
                      <option value="general">General enquiry</option>
                      <option value="order">Order / download issue</option>
                      <option value="product">Product question</option>
                      <option value="refund">Refund request</option>
                      <option value="technical">Technical support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl font-semibold text-base transition-all"
                  >
                    {loading ? "Sending..." : "Send message"}
                  </Button>

                  <p className="text-xs text-stone-400 text-center">
                    By submitting this form you agree to our{" "}
                    <a href="/privacy-policy" className="underline hover:text-stone-600">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
