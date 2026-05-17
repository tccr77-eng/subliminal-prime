// AnnouncementBar — fixed top bar, dismissible, links to /bundles
import { X } from "lucide-react";
import { Link } from "wouter";
import { useAnnouncement } from "@/contexts/AnnouncementContext";

export default function AnnouncementBar() {
  const { visible, dismiss } = useAnnouncement();
  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center px-10 py-2.5 text-center"
      style={{ background: "#1a1f2e", height: "40px" }}
    >
      <p className="text-xs font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        🎧 Free instant download with every order ·{" "}
        <Link href="/bundles">
          <span className="underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#818cf8" }}>
            Save up to £20 with bundles →
          </span>
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={12} className="text-white/60" />
      </button>
    </div>
  );
}
