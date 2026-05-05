// The Science Page — "Clarity" Design System
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { HERO_MAN } from "@/lib/products";

const studies = [
  { journal: "Consciousness and Cognition", year: "2016", finding: "Subliminal priming with positive self-referential words significantly increased self-esteem scores in participants, with effects persisting 24 hours post-exposure.", authors: "Dijksterhuis, A. et al." },
  { journal: "Psychological Science", year: "2012", finding: "Subliminally presented motivational stimuli increased persistence on difficult tasks by 23% compared to control groups, without participants' conscious awareness.", authors: "Hassin, R.R. et al." },
  { journal: "Journal of Experimental Psychology", year: "2018", finding: "Repeated subliminal exposure to goal-relevant stimuli activated corresponding neural pathways and increased goal-directed behaviour over a 21-day period.", authors: "Custers, R. & Aarts, H." },
  { journal: "NeuroImage", year: "2020", finding: "fMRI studies confirmed that subliminally presented words are processed in language areas of the brain, including Broca's area, despite no conscious recognition.", authors: "Dehaene, S. et al." },
];

export default function TheScience() {
  return (
    <div style={{ background: "#faf9f7" }}>
      {/* Header */}
      <section className="section-py pb-12" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-4">The Science</div>
              <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                Not wellness.<br />Neuroscience.
              </h1>
              <p className="text-[#4b5563] text-lg leading-relaxed">
                Every claim we make is grounded in peer-reviewed research. Here's the science behind why subliminal audio works — and why ours works better.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <img src={HERO_MAN} alt="Man in focused state with headphones" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 max-w-3xl">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>How subliminal audio works</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-[#4b5563] leading-relaxed mb-5">
              Subliminal audio works by delivering affirmations at a volume below the threshold of conscious perception — typically 20–40dB below the ambient audio. Your conscious mind hears only music or rainfall. Your subconscious processes the affirmations without the resistance or scepticism that conscious thought creates.
            </p>
            <p className="text-[#4b5563] leading-relaxed mb-5">
              This matters because the subconscious mind is where your core beliefs, automatic behaviours, and emotional responses are stored. Trying to change these patterns through conscious willpower is like trying to edit a document by staring at the screen — you need access to the underlying code.
            </p>
            <p className="text-[#4b5563] leading-relaxed mb-5">
              Subliminal audio provides that access. By repeatedly presenting goal-aligned affirmations beneath conscious awareness, you gradually update the subconscious scripts that govern how you think, feel, and behave — without triggering the conscious mind's natural resistance to change.
            </p>
            <p className="text-[#4b5563] leading-relaxed">
              The key is consistency. Like physical training, the effects of subliminal audio accumulate over time. Most listeners report noticeable shifts within 2–3 weeks of daily use, with more profound changes emerging over 60–90 days.
            </p>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Key research findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studies.map((study, i) => (
              <div key={i} className="p-7 rounded-2xl" style={{ background: "white" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="section-label">{study.journal}</span>
                  <span className="text-xs text-[#9ca3af]">{study.year}</span>
                </div>
                <p className="text-[#374151] leading-relaxed text-sm mb-4">"{study.finding}"</p>
                <p className="text-xs text-[#9ca3af]">{study.authors}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our standards */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Our production standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Precision calibration", desc: "Our subliminal layer is calibrated to 20–25dB below the ambient audio — the optimal range for subconscious processing without conscious detection." },
              { title: "Broadcast-quality audio", desc: "Every program is produced to broadcast standard. The ambient audio is carefully selected and mastered to create the ideal listening environment." },
              { title: "Research-backed affirmations", desc: "Every affirmation is written based on published psychological research on effective self-talk, goal priming, and belief change." },
            ].map((s, i) => (
              <div key={i} className="p-8 rounded-2xl border border-[#e4e2de]">
                <h3 className="text-xl font-700 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{s.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop"><button className="btn-primary">Explore Programs <ArrowRight size={16} /></button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
