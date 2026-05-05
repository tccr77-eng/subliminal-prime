import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sp_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("sp_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("sp_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-stone-900 text-white rounded-2xl shadow-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white mb-1">We use cookies</p>
          <p className="text-xs text-stone-400 leading-relaxed">
            We use cookies to improve your experience, analyse site traffic, and personalise content. By clicking "Accept", you consent to our use of cookies.{" "}
            <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-xs text-stone-400 hover:text-white transition-colors underline"
          >
            Decline
          </button>
          <Button
            onClick={accept}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-5 py-2 text-sm font-semibold transition-all"
          >
            Accept all
          </Button>
          <button
            onClick={decline}
            className="text-stone-500 hover:text-white transition-colors ml-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
