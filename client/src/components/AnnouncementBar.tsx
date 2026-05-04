// AnnouncementBar — scrolling top bar with offer
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center px-10 py-2.5 text-center" style={{ background: "#1a1f2e" }}>
      <p className="text-xs font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        🎧 Free instant download with every order ·{" "}
        <Link href="/bundles">
          <span className="underline cursor-pointer" style={{ color: "#818cf8" }}>Save up to £49 with bundles →</span>
        </Link>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <X size={12} className="text-white/60" />
      </button>
    </div>
  );
}
