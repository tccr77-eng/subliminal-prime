// =============================================================
// SUBLIMINAL PRIME — Product Data Layer
// All 10 programs + 3 bundles with full metadata
// =============================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  emoji: string;
  image: string;
  cardImage: string;
  formats: string[];
  duration: string;
  tracks: string[];
  benefits: string[];
  forWho: string[];
  featured: boolean;
  bestseller?: boolean;
  new?: boolean;
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  products: string[];
  emoji: string;
  badge?: string;
  featured: boolean;
}

const HERO_WOMAN = "https://subliminalprime.b-cdn.net/hero-lifestyle.jpg";
const HERO_MAN = "https://subliminalprime.b-cdn.net/hero-lifestyle-2.jpg";
const PORTRAIT_WOMAN = "https://subliminalprime.b-cdn.net/product-card-woman.jpg";
const PORTRAIT_MAN = "https://subliminalprime.b-cdn.net/product-card-man.jpg";
const ABOUT_IMAGE = "https://subliminalprime.b-cdn.net/about-lifestyle.jpg";

// Unique card images — Unsplash lifestyle photography
const IMG_FOCUS = "https://subliminalprime.b-cdn.net/product-elite-focus.webp"; // calm focused man at laptop
const IMG_CONFIDENCE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face"; // confident woman
const IMG_WEALTH = "https://subliminalprime.b-cdn.net/product-wealth-abundance.webp"; // luxury villa terrace wealth lifestyle
const IMG_ENTREPRENEUR = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=800&fit=crop&crop=center"; // entrepreneur working
const IMG_ATHLETE = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop&crop=center"; // athlete training
const IMG_LEARNING = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=800&fit=crop&crop=center"; // studying / learning
const IMG_SPEAKING = "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=800&fit=crop&crop=center"; // public speaking
const IMG_SLEEP = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=800&fit=crop&crop=center"; // peaceful sleep
const IMG_SOCIAL = "https://subliminalprime.b-cdn.net/product-social-charisma.webp"; // magnetic charisma rooftop group
const IMG_STRESS = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop&crop=center"; // calm meditation

export { HERO_WOMAN, HERO_MAN, PORTRAIT_WOMAN, PORTRAIT_MAN, ABOUT_IMAGE };

export const products: Product[] = [
  {
    id: "elite-focus",
    slug: "elite-focus",
    name: "Elite Focus",
    tagline: "Silence the noise. Command your attention.",
    description: "Engineered for deep, sustained concentration. Rewire your brain's default attention patterns so focus becomes your natural state — not something you have to fight for.",
    longDescription: "Elite Focus uses precisely calibrated subliminal affirmations layered beneath high-quality ambient audio to target the neural pathways responsible for sustained attention, cognitive control, and resistance to distraction. Whether you're a student, entrepreneur, or professional, this program is designed to make deep work feel effortless.",
    price: 14.99,
    category: "Performance",
    emoji: "🎯",
    image: HERO_MAN,
    cardImage: IMG_FOCUS,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Focus Flow (Soft Piano)", "Focus Flow (Rainfall)"],
    benefits: [
      "Sustained deep focus for 2–4 hour work sessions",
      "Reduced susceptibility to digital distraction",
      "Faster entry into flow states",
      "Improved working memory and cognitive stamina",
      "Greater mental clarity under pressure"
    ],
    forWho: ["Entrepreneurs", "Students", "Professionals", "Creatives", "Athletes"],
    featured: true,
    bestseller: true,
  },
  {
    id: "unshakeable-confidence",
    slug: "unshakeable-confidence",
    name: "Unshakeable Confidence",
    tagline: "Walk into every room like you own it.",
    description: "Dissolve self-doubt at its root. This program targets the subconscious beliefs that hold you back and replaces them with an unshakeable sense of self-worth and capability.",
    longDescription: "Confidence isn't a personality trait — it's a learned neural pattern. Unshakeable Confidence works beneath conscious awareness to systematically dismantle limiting beliefs about your worth, ability, and potential. The result is a quiet, grounded certainty that shows up in how you speak, how you carry yourself, and how you perform under pressure.",
    price: 14.99,
    category: "Mindset",
    emoji: "💪",
    image: HERO_WOMAN,
    cardImage: IMG_CONFIDENCE,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Confidence Rising (Soft Piano)", "Confidence Rising (Rainfall)"],
    benefits: [
      "Reduced social anxiety and self-consciousness",
      "Stronger, more assertive communication",
      "Resilience in the face of criticism or rejection",
      "Genuine self-belief that doesn't depend on external validation",
      "Commanding presence in professional and social settings"
    ],
    forWho: ["Professionals", "Entrepreneurs", "Athletes", "Anyone overcoming self-doubt"],
    featured: true,
    bestseller: true,
  },
  {
    id: "wealth-abundance",
    slug: "wealth-abundance",
    name: "Wealth & Abundance",
    tagline: "Rewire your relationship with money.",
    description: "Most financial limitations are mental, not circumstantial. This program targets the deep-seated beliefs about money, scarcity, and worthiness that silently sabotage your earning potential.",
    longDescription: "Wealth & Abundance works on the subconscious scripts that govern how you think about money — whether you believe you deserve it, whether you trust yourself to manage it, and whether you see opportunity or threat in financial risk. By updating these patterns, you create the internal conditions for genuine financial growth.",
    price: 14.99,
    category: "Mindset",
    emoji: "💰",
    image: HERO_MAN,
    cardImage: IMG_WEALTH,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Abundance Flow (Soft Piano)", "Abundance Flow (Rainfall)"],
    benefits: [
      "Shift from scarcity to abundance mindset",
      "Reduced financial anxiety and money guilt",
      "Greater comfort with investing and financial risk",
      "Stronger wealth-building habits and decisions",
      "Alignment between your goals and your subconscious beliefs"
    ],
    forWho: ["Entrepreneurs", "Investors", "Professionals", "Anyone with money blocks"],
    featured: true,
  },
  {
    id: "entrepreneurial-mindset",
    slug: "entrepreneurial-mindset",
    name: "Entrepreneurial Mindset",
    tagline: "Think like a founder. Act like a leader.",
    description: "Build the mental architecture of high-performing entrepreneurs — resilience, decisive action, creative problem-solving, and an unrelenting bias toward growth.",
    longDescription: "The difference between entrepreneurs who build empires and those who stay stuck isn't intelligence or opportunity — it's mindset. This program targets the specific cognitive patterns that distinguish exceptional founders: comfort with uncertainty, rapid decision-making, resilience after failure, and the ability to see opportunity where others see obstacles.",
    price: 14.99,
    category: "Performance",
    emoji: "🚀",
    image: HERO_MAN,
    cardImage: IMG_ENTREPRENEUR,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Founder's Mind (Soft Piano)", "Founder's Mind (Rainfall)"],
    benefits: [
      "Greater comfort with risk and uncertainty",
      "Faster, more decisive action-taking",
      "Resilience and rapid recovery after setbacks",
      "Creative problem-solving and opportunity recognition",
      "Leadership presence and vision clarity"
    ],
    forWho: ["Entrepreneurs", "Startup founders", "Business owners", "Aspiring founders"],
    featured: false,
  },
  {
    id: "peak-athletic-performance",
    slug: "peak-athletic-performance",
    name: "Peak Athletic Performance",
    tagline: "The mental edge that separates good from great.",
    description: "Elite athletes know that performance is 80% mental. This program targets the psychological barriers — fear, self-doubt, performance anxiety — that prevent you from competing at your ceiling.",
    longDescription: "Peak Athletic Performance is built on sports psychology research showing that mental rehearsal, confidence, and emotional regulation are as trainable as physical skills. This program uses subliminal audio to build the mental toughness, competitive drive, and recovery mindset that elite athletes spend years developing.",
    price: 14.99,
    category: "Performance",
    emoji: "🏆",
    image: HERO_MAN,
    cardImage: IMG_ATHLETE,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Champion's Mind (Soft Piano)", "Champion's Mind (Rainfall)"],
    benefits: [
      "Reduced performance anxiety and pre-competition nerves",
      "Stronger competitive drive and winning mentality",
      "Faster mental recovery after poor performance",
      "Greater pain tolerance and physical endurance",
      "Improved focus during high-pressure competition"
    ],
    forWho: ["Athletes", "Competitors", "Fitness enthusiasts", "Sports professionals"],
    featured: false,
  },
  {
    id: "accelerated-learning",
    slug: "accelerated-learning",
    name: "Accelerated Learning",
    tagline: "Absorb more. Retain longer. Apply faster.",
    description: "Unlock your brain's full learning capacity. This program targets the beliefs and neural patterns that limit how quickly and deeply you absorb new information.",
    longDescription: "Accelerated Learning works on the subconscious assumptions you hold about your own intelligence and learning ability — the 'I'm not good at this' stories that create a ceiling on your potential. By dissolving these limitations and reinforcing a growth mindset at the subconscious level, you create the conditions for dramatically faster skill acquisition.",
    price: 14.99,
    category: "Performance",
    emoji: "🧠",
    image: HERO_WOMAN,
    cardImage: IMG_LEARNING,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Learning State (Soft Piano)", "Learning State (Rainfall)"],
    benefits: [
      "Faster information absorption and retention",
      "Stronger growth mindset and intellectual curiosity",
      "Reduced study anxiety and exam performance blocks",
      "Better memory consolidation during sleep",
      "Greater enjoyment of the learning process"
    ],
    forWho: ["Students", "Professionals upskilling", "Language learners", "Lifelong learners"],
    featured: false,
    new: true,
  },
  {
    id: "master-public-speaking",
    slug: "master-public-speaking",
    name: "Master Public Speaking",
    tagline: "Speak with power. Be heard. Be remembered.",
    description: "Public speaking anxiety affects 75% of people. This program targets the fear response at its source, replacing it with calm authority and genuine presence.",
    longDescription: "The fear of public speaking is almost entirely a subconscious phenomenon — a threat response that has nothing to do with your actual ability to communicate. Master Public Speaking works directly on this fear response, systematically replacing it with confidence, presence, and the genuine enjoyment of being heard.",
    price: 14.99,
    category: "Communication",
    emoji: "🎤",
    image: HERO_WOMAN,
    cardImage: IMG_SPEAKING,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Presence (Soft Piano)", "Presence (Rainfall)"],
    benefits: [
      "Dramatic reduction in public speaking anxiety",
      "Calm, grounded presence on stage or in meetings",
      "Clearer, more compelling verbal communication",
      "Authentic confidence rather than performed confidence",
      "Ability to think clearly under the spotlight"
    ],
    forWho: ["Professionals", "Leaders", "Salespeople", "Anyone with speaking anxiety"],
    featured: false,
  },
  {
    id: "deep-sleep",
    slug: "deep-sleep",
    name: "Deep Sleep",
    tagline: "Fall asleep faster. Wake up restored.",
    description: "Designed to be listened to as you drift off, this program quiets the overactive mind and guides your nervous system into deep, restorative sleep.",
    longDescription: "Deep Sleep addresses the most common cause of poor sleep: an overactive, anxious mind that won't switch off. The subliminal layer works on the subconscious anxiety and hypervigilance patterns that keep your nervous system in a state of low-level alert, while the ambient audio creates the perfect acoustic environment for sleep onset.",
    price: 14.99,
    category: "Wellbeing",
    emoji: "🌙",
    image: HERO_WOMAN,
    cardImage: IMG_SLEEP,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Deep Rest (Soft Piano)", "Deep Rest (Rainfall)"],
    benefits: [
      "Faster sleep onset — fall asleep in minutes, not hours",
      "Deeper, more restorative sleep cycles",
      "Reduced night-time anxiety and racing thoughts",
      "Waking feeling genuinely refreshed and energised",
      "Improved mood and cognitive function from better rest"
    ],
    forWho: ["Anyone with insomnia", "High-stress professionals", "Overthinkers", "Shift workers"],
    featured: false,
  },
  {
    id: "social-charisma",
    slug: "social-charisma",
    name: "Social Charisma",
    tagline: "Be the person people gravitate toward.",
    description: "Charisma isn't a gift — it's a set of subconscious patterns around warmth, presence, and authentic self-expression. This program builds those patterns from the inside out.",
    longDescription: "Social Charisma targets the self-consciousness, social anxiety, and approval-seeking patterns that make social interactions feel effortful or draining. By working on these patterns at the subconscious level, you develop a natural warmth and presence that makes people genuinely enjoy being around you.",
    price: 14.99,
    category: "Communication",
    emoji: "✨",
    image: HERO_WOMAN,
    cardImage: IMG_SOCIAL,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Magnetic Presence (Soft Piano)", "Magnetic Presence (Rainfall)"],
    benefits: [
      "Natural ease and comfort in social situations",
      "Genuine warmth and interest in others",
      "Reduced social anxiety and overthinking",
      "Magnetic, memorable presence",
      "Stronger, more authentic relationships"
    ],
    forWho: ["Introverts", "Professionals networking", "Leaders", "Anyone wanting better relationships"],
    featured: false,
    new: true,
  },
  {
    id: "stress-resilience",
    slug: "stress-resilience",
    name: "Stress Resilience",
    tagline: "Pressure is a privilege. Learn to thrive under it.",
    description: "Build a nervous system that handles pressure with grace. This program targets the stress response at its root, building genuine resilience rather than just coping strategies.",
    longDescription: "Stress Resilience works on the subconscious threat-detection patterns that cause your nervous system to over-respond to everyday pressures. By recalibrating these patterns, you develop a genuine capacity to remain calm, clear-headed, and effective under conditions that would overwhelm most people.",
    price: 14.99,
    category: "Wellbeing",
    emoji: "🧘",
    image: HERO_WOMAN,
    cardImage: IMG_STRESS,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Still Point (Soft Piano)", "Still Point (Rainfall)"],
    benefits: [
      "Calmer, more measured response to stressors",
      "Faster physiological recovery after stress",
      "Reduced cortisol and anxiety patterns",
      "Greater emotional regulation under pressure",
      "Ability to perform at your best when stakes are highest"
    ],
    forWho: ["High-performers", "Parents", "Healthcare workers", "Anyone under chronic stress"],
    featured: false,
  },
];

export const bundles: Bundle[] = [
  {
    id: "founders-focus-pack",
    slug: "founders-focus-pack",
    name: "Founder's Focus Pack",
    tagline: "The complete mental stack for entrepreneurs and business builders.",
    description: "Three programmes most requested by founders and executives — Elite Focus, Entrepreneurial Mindset, and Unshakeable Confidence. Everything you need to build a business and the mental fortitude to see it through.",
    price: 34.99,
    originalPrice: 44.97,
    savings: 9.98,
    products: ["elite-focus", "entrepreneurial-mindset", "unshakeable-confidence"],
    emoji: "🚀",
    featured: true,
  },
  {
    id: "peak-performer-bundle",
    slug: "peak-performer-bundle",
    name: "Peak Performer Bundle",
    tagline: "Five programmes for those who refuse to leave anything on the table.",
    description: "Curated for athletes, students, and professionals who want to perform at the absolute highest level across every domain. Elite Focus, Peak Athletic Performance, Accelerated Learning, Stress Resilience, and Deep Sleep.",
    price: 54.99,
    originalPrice: 74.95,
    savings: 19.96,
    products: ["elite-focus", "peak-athletic-performance", "accelerated-learning", "stress-resilience", "deep-sleep"],
    emoji: "🏆",
    badge: "Most Popular",
    featured: true,
  },
  {
    id: "complete-collection",
    slug: "complete-collection",
    name: "Complete Collection",
    tagline: "All 10 programmes. Every goal. One investment.",
    description: "The most comprehensive subliminal audio library available for performance-focused individuals. Every category, every topic — yours for life at a fraction of the individual price.",
    price: 99.99,
    originalPrice: 149.90,
    savings: 49.91,
    products: ["elite-focus", "unshakeable-confidence", "wealth-abundance", "entrepreneurial-mindset", "peak-athletic-performance", "accelerated-learning", "master-public-speaking", "deep-sleep", "social-charisma", "stress-resilience"],
    emoji: "💎",
    badge: "Best Value",
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return products.filter(p => p.bestseller);
}
