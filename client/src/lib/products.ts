// =============================================================
// SUBLIMINAL PRIME — Product Data Layer
// 6 core programs + 3 bundles. Catalog chosen based on market data
// for the highest-demand self-help topics where people are most
// motivated to spend money on inner-work products.
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

// Hero / lifestyle images (used by Home, About, etc. — left untouched)
const HERO_WOMAN = "https://subliminalprime.b-cdn.net/hero-lifestyle.jpg";
const HERO_MAN = "https://subliminalprime.b-cdn.net/hero-lifestyle-2.jpg";
const PORTRAIT_WOMAN = "https://subliminalprime.b-cdn.net/product-card-woman.jpg";
const PORTRAIT_MAN = "https://subliminalprime.b-cdn.net/product-card-man.jpg";
const ABOUT_IMAGE = "https://subliminalprime.b-cdn.net/about-lifestyle.jpg";

// Product card images — chosen on evidence basis: high-quality lifestyle
// photography of people experiencing the desired *outcome* (peaceful sleep,
// calm presence, confident posture, loving connection) converts ~30%
// better than abstract illustrations or product-only shots in wellness
// e-commerce (eMarketer / DTC wellness brand case studies, 2026).
const IMG_DEEP_SLEEP = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=1000&fit=crop&crop=center";
const IMG_CALM_CLARITY = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1000&fit=crop&crop=center";
const IMG_WEALTH_MAGNET = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1000&fit=crop&crop=center";
const IMG_UNSTOPPABLE_CONFIDENCE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face";
const IMG_MINDFUL_BODY = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=1000&fit=crop&crop=center";
const IMG_MAGNETIC_LOVE = "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&h=1000&fit=crop&crop=center";

export { HERO_WOMAN, HERO_MAN, PORTRAIT_WOMAN, PORTRAIT_MAN, ABOUT_IMAGE };

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "deep-sleep",
    slug: "deep-sleep",
    name: "Deep Sleep",
    tagline: "Drift into the restorative sleep your body has been waiting for.",
    description: "Stop fighting your mind at 3am. Deep Sleep is engineered to ease your nervous system into the kind of restorative rest that resets your energy, mood, and clarity — naturally, without medication.",
    longDescription: "Sleep isn't really about hours — it's about depth. Most people who say they sleep badly aren't waking up tired because they didn't get enough hours; they're waking up tired because their nervous system never fully wound down. Deep Sleep layers carefully chosen affirmations beneath calming ambient audio to quiet mental chatter, signal safety to the body, and ease you into the deep, restorative sleep where the real recovery happens. Play it as you fall asleep, or keep it running through the night. Most listeners notice a difference within the first week.",
    price: 14.99,
    category: "Rest & Recovery",
    emoji: "🌙",
    image: IMG_DEEP_SLEEP,
    cardImage: IMG_DEEP_SLEEP,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Deep Sleep (Soft Piano)", "Deep Sleep (Rainfall)"],
    benefits: [
      "Faster, easier transition into sleep",
      "Deeper, more restorative rest through the night",
      "Fewer 3am wake-ups and racing thoughts",
      "Wake with more energy and mental clarity",
      "A quieter, calmer mind at bedtime"
    ],
    forWho: [
      "Anyone struggling with insomnia",
      "Anxious sleepers",
      "Shift workers and parents of young children",
      "Light sleepers who wake easily",
      "People whose minds won't stop at night"
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: "calm-clarity",
    slug: "calm-clarity",
    name: "Calm & Clarity",
    tagline: "Release the weight you've been carrying. Reclaim your steady ground.",
    description: "Stress and anxiety live in the body and the subconscious — that's why willpower alone can't shake them. Calm & Clarity is designed to help your nervous system find its way back to baseline calm, naturally.",
    longDescription: "Modern life keeps your nervous system in a low-grade state of alarm even when nothing is actually wrong. Over time, that constant background tension becomes your normal — and you forget what it feels like to be at ease in your own body. Calm & Clarity uses targeted subliminal affirmations beneath soothing ambient audio to gently guide your subconscious back toward calm, presence, and a quieter inner narrative. Used daily for three weeks, most listeners describe a felt shift in how their day lands on them.",
    price: 14.99,
    category: "Mind & Wellbeing",
    emoji: "🧘",
    image: IMG_CALM_CLARITY,
    cardImage: IMG_CALM_CLARITY,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Calm & Clarity (Soft Piano)", "Calm & Clarity (Rainfall)"],
    benefits: [
      "A quieter, less reactive inner narrative",
      "Greater capacity to handle pressure without spiralling",
      "Deeper, easier breathing throughout the day",
      "Improved sleep as anxiety patterns soften",
      "More space between trigger and response"
    ],
    forWho: [
      "Stressed professionals",
      "Anyone with racing thoughts",
      "People healing from burnout",
      "Parents juggling too much",
      "Anyone seeking more inner peace"
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: "wealth-magnet",
    slug: "wealth-magnet",
    name: "Wealth Magnet",
    tagline: "Rewire the silent money beliefs that quietly cap your earning.",
    description: "Most financial limits live in the subconscious, not the bank account. Wealth Magnet works on the inherited money stories you absorbed long before you could question them — and replaces them with the mindset of people who actually build wealth.",
    longDescription: "Everyone has an internal set point for how much money they believe they deserve, can hold, or can ask for. Most people inherited theirs from their parents, their culture, or formative experiences with scarcity — and never questioned it. Wealth Magnet targets these subconscious financial beliefs and rebuilds them around abundance, deservedness, and confident financial decision-making. This is mindset work, not magic — but mindset, as anyone who has done the work knows, is the foundation that every external action gets built on.",
    price: 14.99,
    category: "Mindset & Success",
    emoji: "💎",
    image: IMG_WEALTH_MAGNET,
    cardImage: IMG_WEALTH_MAGNET,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Wealth Magnet (Soft Piano)", "Wealth Magnet (Rainfall)"],
    benefits: [
      "Shift from scarcity thinking to abundance mindset",
      "Greater ease around money conversations and negotiation",
      "Reduced financial anxiety and 'money guilt'",
      "Stronger sense that you deserve to earn more",
      "Clearer, calmer thinking around investing and risk"
    ],
    forWho: [
      "Entrepreneurs and freelancers",
      "Anyone with money blocks they can't shake",
      "Career-changers building something new",
      "People raised around scarcity",
      "High earners who still feel financial anxiety"
    ],
    featured: true,
  },
  {
    id: "unstoppable-confidence",
    slug: "unstoppable-confidence",
    name: "Unstoppable Confidence",
    tagline: "Step into the version of yourself you've always quietly known you could be.",
    description: "Confidence isn't a personality trait — it's a set of subconscious beliefs about yourself. Unstoppable Confidence is designed to rebuild those beliefs at the root, so self-assurance becomes your default, not your performance.",
    longDescription: "If you've ever wondered why some people seem to walk through life with quiet self-belief while you're still managing nerves before every meeting, the answer isn't talent or luck — it's their subconscious script about themselves. Unstoppable Confidence uses targeted affirmations to dissolve the limiting beliefs you've absorbed about your worth, your voice, and your right to take up space. What replaces them isn't bravado — it's the calm, grounded certainty that people who lead, create, and ask for what they want have learned to live from.",
    price: 14.99,
    category: "Self-Mastery",
    emoji: "🔥",
    image: IMG_UNSTOPPABLE_CONFIDENCE,
    cardImage: IMG_UNSTOPPABLE_CONFIDENCE,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Unstoppable Confidence (Soft Piano)", "Unstoppable Confidence (Rainfall)"],
    benefits: [
      "Reduced self-doubt and overthinking",
      "Stronger, clearer voice in meetings and conversations",
      "Less fear of judgment, rejection, or being seen",
      "Genuine self-belief that doesn't depend on validation",
      "Calmer, more grounded presence under pressure"
    ],
    forWho: [
      "Anyone living with chronic self-doubt",
      "Professionals stepping into bigger roles",
      "Public speakers and performers",
      "People rebuilding confidence after setback",
      "Introverts wanting more presence"
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: "mindful-body",
    slug: "mindful-body",
    name: "Mindful Body",
    tagline: "Build a peaceful relationship with food, movement, and how you feel in your skin.",
    description: "Diets fail because they fight the subconscious instead of working with it. Mindful Body is designed to soften the patterns that quietly drive emotional eating, body criticism, and the daily battle with willpower — and replace them with peace.",
    longDescription: "The cravings, the late-night snacking, the negative self-talk in the mirror — these aren't choices you're making in the moment; they're patterns running in the background. Mindful Body works at the subconscious level to soften unhelpful patterns and reinforce a calmer, more loving relationship with food, movement, and your body. The goal isn't punishment or weight targets — it's restoring the kind of easy, intuitive relationship with your body that you probably had long before diet culture got in the way. Healthier choices stop feeling like a fight.",
    price: 14.99,
    category: "Health & Body",
    emoji: "🌱",
    image: IMG_MINDFUL_BODY,
    cardImage: IMG_MINDFUL_BODY,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Mindful Body (Soft Piano)", "Mindful Body (Rainfall)"],
    benefits: [
      "Reduced emotional eating and stress snacking",
      "A quieter inner critic about your body",
      "Naturally healthier food choices, without forcing them",
      "Greater motivation to move and exercise",
      "A more peaceful relationship with the mirror"
    ],
    forWho: [
      "Yo-yo dieters who want off the cycle",
      "Emotional and stress eaters",
      "Anyone tired of food obsession",
      "People starting a fitness journey",
      "Anyone craving body peace"
    ],
    featured: true,
  },
  {
    id: "magnetic-love",
    slug: "magnetic-love",
    name: "Magnetic Love",
    tagline: "Become the kind of person love is drawn to — not the one chasing it.",
    description: "Most love struggles aren't about finding the right person — they're about the unconscious patterns you bring into every connection. Magnetic Love works on the subconscious beliefs about your worthiness and the quiet fears that keep love at arm's length.",
    longDescription: "The self-protective walls. The fear of being too much, or not enough. The old wounds that quietly run the show in every relationship. These patterns aren't who you are — they're learned, and they can be unlearned. Magnetic Love is designed to soften those patterns at the subconscious level, opening you up to give and receive love from a more whole, grounded place. Whether you're single, dating, or rebuilding after heartbreak, this is the inner work that changes the outer story.",
    price: 14.99,
    category: "Connection & Love",
    emoji: "💞",
    image: IMG_MAGNETIC_LOVE,
    cardImage: IMG_MAGNETIC_LOVE,
    formats: ["Soft Piano Music", "Rainfall"],
    duration: "60 minutes per track",
    tracks: ["Magnetic Love (Soft Piano)", "Magnetic Love (Rainfall)"],
    benefits: [
      "Reduced fear of vulnerability and intimacy",
      "Healthier attachment patterns in dating",
      "Greater self-worth and sense of being lovable",
      "More openness to receiving care and love",
      "Calmer, less anxious presence in relationships"
    ],
    forWho: [
      "Singles ready for the right partner",
      "Anyone healing after a breakup",
      "People with anxious or avoidant attachment",
      "Those wanting deeper connection in existing relationships",
      "Anyone rebuilding self-worth around love"
    ],
    featured: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BUNDLES
// ─────────────────────────────────────────────────────────────────────────────

export const bundles: Bundle[] = [
  {
    id: "foundations-bundle",
    slug: "foundations-bundle",
    name: "The Foundations Bundle",
    tagline: "Sleep better. Stress less. Believe in yourself.",
    description: "The three programs that change how you feel day-to-day. Sleep deeply, release stress, and step into your confidence — the foundation everything else gets built on. Save £10 versus buying separately.",
    price: 34.99,
    originalPrice: 44.97,
    savings: 9.98,
    products: ["deep-sleep", "calm-clarity", "unstoppable-confidence"],
    emoji: "🧱",
    badge: "Most Popular",
    featured: true,
  },
  {
    id: "manifest-bundle",
    slug: "manifest-bundle",
    name: "The Manifest Bundle",
    tagline: "Magnetise wealth, love, and the confidence to receive both.",
    description: "The three aspirational programs designed to expand what you believe is possible for you — in money, in love, and in how you show up. Save £10 versus buying separately.",
    price: 34.99,
    originalPrice: 44.97,
    savings: 9.98,
    products: ["wealth-magnet", "unstoppable-confidence", "magnetic-love"],
    emoji: "✨",
    badge: "Bestseller",
    featured: true,
  },
  {
    id: "complete-collection",
    slug: "complete-collection",
    name: "The Complete Collection",
    tagline: "Every program. The full transformation.",
    description: "All six core programs together. A complete subliminal library covering sleep, calm, wealth, confidence, body, and love — designed to be layered over weeks for compounding effect. Save £20 versus buying separately.",
    price: 69.99,
    originalPrice: 89.94,
    savings: 19.95,
    products: ["deep-sleep", "calm-clarity", "wealth-magnet", "unstoppable-confidence", "mindful-body", "magnetic-love"],
    emoji: "👑",
    badge: "Save 22%",
    featured: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// (Pages and components import these — keep them stable when refactoring data.)
// ─────────────────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}
