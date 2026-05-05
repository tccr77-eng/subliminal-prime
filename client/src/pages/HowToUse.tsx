// How To Use Page — "Clarity" Design System
import { Link } from "wouter";
import { ArrowRight, Music, CloudRain, Moon, Sun, Dumbbell, BookOpen } from "lucide-react";

export default function HowToUse() {
  return (
    <div style={{ background: "#faf9f7" }}>
      <section className="section-py pb-12" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="section-label mb-4">Getting Started</div>
          <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            How to get the<br />best results.
          </h1>
          <p className="text-[#4b5563] text-lg max-w-xl leading-relaxed">
            Subliminal audio is simple to use — but a few key practices will dramatically accelerate your results.
          </p>
        </div>
      </section>

      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl">
          {[
            { step: "01", title: "Listen once daily", desc: "Consistency is the single most important factor. One 60-minute session per day is the recommended protocol. You don't need to listen more — the subconscious processes the affirmations even at low exposure levels, and daily repetition over weeks is what creates lasting change." },
            { step: "02", title: "Choose the right format for your activity", desc: "Use the Soft Piano Music version when you need to focus, study, or work. Use the Rainfall version when you want something more ambient — during exercise, commuting, or as you fall asleep. Both formats contain the identical subliminal layer, so the choice is purely about what suits your activity." },
            { step: "03", title: "Don't actively try to listen for the affirmations", desc: "The subliminal layer is designed to be inaudible to the conscious mind. Trying to hear it will only create frustration. Simply play the audio at a comfortable volume and go about your activity. Your subconscious will do the work." },
            { step: "04", title: "Be consistent for at least 30 days", desc: "Most listeners notice subtle shifts within 2–3 weeks. More significant changes typically emerge at the 30–60 day mark. Commit to daily use for at least 30 days before evaluating results. The changes often feel natural and gradual — like you've always been this way." },
            { step: "05", title: "Stack with intentional action", desc: "Subliminal audio works best as a complement to deliberate action, not a replacement for it. If you're using the Confidence program, also put yourself in situations that require you to act confidently. The audio rewires the belief; the action reinforces it." },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 mb-10 pb-10 border-b border-[#e4e2de] last:border-0 last:mb-0 last:pb-0">
              <div className="text-5xl font-800 shrink-0 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, color: "#e4e2de" }}>{item.step}</div>
              <div>
                <h3 className="text-xl font-700 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{item.title}</h3>
                <p className="text-[#4b5563] leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Best times to listen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Moon size={20} />, title: "Before sleep", desc: "The most powerful time. As you drift off, your brain enters a highly receptive hypnagogic state. Use the Rainfall version." },
              { icon: <Sun size={20} />, title: "Morning routine", desc: "Set the tone for the day. Listen while getting ready, having breakfast, or during a morning walk." },
              { icon: <Dumbbell size={20} />, title: "During exercise", desc: "Replace your workout playlist with your program. The physical state of exercise enhances receptivity." },
              { icon: <BookOpen size={20} />, title: "While studying or working", desc: "Use the Soft Piano version as your focus soundtrack. It doubles as ambient music and subliminal programming." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: "white" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#e8ecff" }}>
                  <span style={{ color: "#4f6ef7" }}>{item.icon}</span>
                </div>
                <h4 className="font-700 text-[#1a1f2e] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{item.title}</h4>
                <p className="text-xs text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Ready to begin?</h2>
          <p className="text-[#4b5563] mb-8">Browse our library and find the program that matches your goal.</p>
          <Link href="/shop"><button className="btn-primary">Browse All Programs <ArrowRight size={16} /></button></Link>
        </div>
      </section>
    </div>
  );
}
