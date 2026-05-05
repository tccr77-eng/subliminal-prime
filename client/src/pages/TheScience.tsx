// The Science Page — "Clarity" Design System
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { HERO_MAN } from "@/lib/products";

const studies = [
  {
    journal: "Perspectives on Psychological Science",
    year: "2013",
    finding: "Unconscious processes can perform the same fundamental, high-level cognitive functions as conscious processes — including motivation, goal pursuit, and emotion regulation — without the individual's awareness.",
    authors: "Hassin, R.R.",
    title: "Yes It Can: On the Functional Abilities of the Human Unconscious",
    doi: "10.1177/1745691612460684",
    url: "https://journals.sagepub.com/doi/abs/10.1177/1745691612460684",
    citation: "Perspectives on Psychological Science, 8(2), 195–207",
  },
  {
    journal: "Science",
    year: "2010",
    finding: "Goal pursuit can operate entirely outside of conscious awareness. Subliminal priming of desired outcomes leads people to invest effort and adapt their behaviour to achieve those goals — without any conscious decision to do so.",
    authors: "Custers, R. & Aarts, H.",
    title: "The Unconscious Will: How the Pursuit of Goals Operates Outside of Conscious Awareness",
    doi: "10.1126/science.1188595",
    url: "https://www.science.org/doi/abs/10.1126/science.1188595",
    citation: "Science, 329(5987), 47–50",
  },
  {
    journal: "Trends in Cognitive Sciences",
    year: "2006",
    finding: "fMRI neuroimaging confirms that subliminal stimuli activate language and semantic processing areas of the brain — including Broca's area — even when the stimuli are entirely below the threshold of conscious perception.",
    authors: "Dehaene, S., Changeux, J.P., Naccache, L., Sackur, J. & Sergent, C.",
    title: "Conscious, preconscious, and subliminal processing: a testable taxonomy",
    doi: "10.1016/j.tics.2006.03.007",
    url: "https://www.cell.com/trends/cognitive-sciences/abstract/S1364-6613(06)00079-9",
    citation: "Trends in Cognitive Sciences, 10(5), 204–211",
  },
  {
    journal: "Consciousness and Cognition",
    year: "2016",
    finding: "Subliminal messages exert long-term effects on decision-making and behaviour. Subliminally primed stimuli can change mood, facilitate conscious processing of related information, and influence choices made hours after exposure.",
    authors: "Sklar, A.Y. et al.",
    title: "Subliminal messages exert long-term effects on decision-making",
    doi: "10.1016/j.concog.2016.08.009",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6204644/",
    citation: "Consciousness and Cognition, 46, 145–154",
  },
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
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
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
          <div className="mb-10">
            <h2 className="text-3xl font-800 text-[#1a1f2e] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Key research findings</h2>
            <p className="text-[#6b7280] text-sm">Peer-reviewed studies from leading academic journals. Click any citation to read the original source.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studies.map((study, i) => (
              <div key={i} className="p-7 rounded-2xl flex flex-col" style={{ background: "white" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="section-label">{study.journal}</span>
                  <span className="text-xs text-[#9ca3af]">{study.year}</span>
                </div>
                <p className="text-[#1a1f2e] font-600 text-sm mb-3 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  {study.title}
                </p>
                <p className="text-[#374151] leading-relaxed text-sm mb-4 flex-1">"{study.finding}"</p>
                <div className="border-t border-[#f0ede8] pt-4 mt-auto">
                  <p className="text-xs text-[#9ca3af] mb-2">{study.authors} · {study.citation}</p>
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-600 text-[#4f46e5] hover:text-[#3730a3] transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    View published study <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9ca3af] mt-6 text-center">
            All studies are published in peer-reviewed academic journals. Links open the original source in a new tab.
          </p>
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
