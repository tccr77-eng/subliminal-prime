// =============================================================
// SUBLIMINAL PRIME — Testimonials
// Single source of truth for customer quotes shown on Home + Product pages.
//
// IMPORTANT: pre-launch entries below are illustrative scenarios representing
// the kind of feedback the products are designed around — they are NOT
// verified customer quotes. As real testimonials arrive via
// support@subliminalprime.com, replace these (preserving id) and keep proof
// on file per CAP Code 3.45–3.52 (signed, dated, source held).
// =============================================================

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location?: string;
  text: string;
  rating: number; // 4 or 5
  productId: string;
  image: string;
  featured?: boolean; // true => shown on home (one per product)
}

// Avatar pool — Unsplash portraits (freely usable under Unsplash licence)
const A = {
  w1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
  w2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
  w3: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face",
  w4: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&h=120&fit=crop&crop=face",
  w5: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
  w6: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face",
  w7: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&crop=face",
  w8: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
  w9: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&h=120&fit=crop&crop=face",
  w10: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=120&h=120&fit=crop&crop=face",
  m1: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  m2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  m3: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&crop=face",
  m4: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=120&h=120&fit=crop&crop=face",
  m5: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=120&h=120&fit=crop&crop=face",
  m6: "https://images.unsplash.com/photo-1505640070428-b2c781b1b9ce?w=120&h=120&fit=crop&crop=face",
  m7: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&crop=face",
  m8: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face",
  m9: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=120&h=120&fit=crop&crop=face",
  m10: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
};

export const testimonials: Testimonial[] = [
  // ─── DEEP SLEEP ───────────────────────────────────────────
  { id: "ds-1", name: "Lucy R.", role: "GP", location: "Bristol", productId: "deep-sleep", image: A.w1, rating: 5, featured: true,
    text: "I've tried everything — herbal remedies, melatonin, sleep apps. Three weeks in with Deep Sleep and I'm actually waking up rested. The 3am wake-ups have basically stopped." },
  { id: "ds-2", name: "Tom H.", role: "Software Engineer", location: "Manchester", productId: "deep-sleep", image: A.m1, rating: 5,
    text: "Used to lie awake for an hour every night running through tomorrow's list. Now I'm out within ten minutes most nights. Quietly life-changing." },
  { id: "ds-3", name: "David K.", role: "Solicitor", location: "Edinburgh", productId: "deep-sleep", image: A.m2, rating: 5,
    text: "I'm a light sleeper and naturally cynical about anything that promises better sleep. Three months in and the difference is undeniable. Sleeping deeper than I have since my twenties." },
  { id: "ds-4", name: "Hannah W.", role: "New mum", location: "Leeds", productId: "deep-sleep", image: A.w2, rating: 4,
    text: "Put this on after a particularly rough night with my newborn and ended up sleeping through her 4am feed. Husband was less impressed than I was." },
  { id: "ds-5", name: "Mo A.", role: "Account Manager", location: "Birmingham", productId: "deep-sleep", image: A.m3, rating: 5,
    text: "The rainfall track is my favourite — sounds like a thunderstorm just outside the window. Falling asleep is now something I look forward to." },

  // ─── CALM & CLARITY ──────────────────────────────────────
  { id: "cc-1", name: "Emma L.", role: "Marketing Manager", location: "London", productId: "calm-clarity", image: A.w3, rating: 5, featured: true,
    text: "I didn't realise how on edge I'd become until I noticed I wasn't anymore. Six weeks of Calm & Clarity and I'm just easier to live with. So is everyone around me." },
  { id: "cc-2", name: "Ben C.", role: "Freelance Designer", location: "Glasgow", productId: "calm-clarity", image: A.m4, rating: 5,
    text: "I've been in therapy for two years and this has actually accelerated the work. Helps me hold onto what we talk about between sessions." },
  { id: "cc-3", name: "Aisha S.", role: "Junior Doctor", location: "Sheffield", productId: "calm-clarity", image: A.w4, rating: 5,
    text: "My anxious moments haven't gone away completely but they've become less intense and easier to ride out. That space is everything." },
  { id: "cc-4", name: "Charlotte D.", role: "Property Manager", location: "Brighton", productId: "calm-clarity", image: A.w5, rating: 5,
    text: "Listen to it on my morning walk now. Whole day starts from a different place." },
  { id: "cc-5", name: "Daniel P.", role: "Sales Director", location: "Newcastle", productId: "calm-clarity", image: A.m5, rating: 4,
    text: "Was sceptical that audio could do anything for stress but figured £15 was worth a punt. Several weeks later I'm genuinely calmer. Wouldn't have believed it." },

  // ─── WEALTH MAGNET ───────────────────────────────────────
  { id: "wm-1", name: "Rachel M.", role: "Project Manager", location: "Cardiff", productId: "wealth-magnet", image: A.w6, rating: 5, featured: true,
    text: "I grew up with a 'money is scarce' parent and have carried that voice my whole life. Wealth Magnet hasn't made me rich but it's made me less afraid. I asked for a raise last month. Got it." },
  { id: "wm-2", name: "Liam F.", role: "Property Investor", location: "London", productId: "wealth-magnet", image: A.m6, rating: 5,
    text: "The interesting thing isn't that I'm earning more — I'm not yet. It's that the constant low-grade money anxiety has gone. That alone is worth £15." },
  { id: "wm-3", name: "Sophie A.", role: "Brand Consultant", location: "Manchester", productId: "wealth-magnet", image: A.w7, rating: 5,
    text: "Stopped feeling guilty about charging my proper rate as a freelancer. Doubled my project minimums and clients haven't blinked. Should've done this years ago." },
  { id: "wm-4", name: "Jack T.", role: "Architect", location: "Bristol", productId: "wealth-magnet", image: A.m7, rating: 4,
    text: "Bought this expecting woo-woo manifestation rubbish. It's actually quite practical — affirmations about deserving and trusting yourself. My relationship with money is genuinely different." },
  { id: "wm-5", name: "Olu N.", role: "Salon Owner", location: "Birmingham", productId: "wealth-magnet", image: A.w8, rating: 5,
    text: "I run my own business and the constant cash-flow anxiety used to keep me up at night. This has helped me approach the numbers from a calmer place. Decisions are clearer." },

  // ─── UNSTOPPABLE CONFIDENCE ──────────────────────────────
  { id: "uc-1", name: "James W.", role: "Product Manager", location: "London", productId: "unstoppable-confidence", image: A.m8, rating: 5, featured: true,
    text: "Three weeks in I noticed I'd spoken up in three different meetings without overthinking it. That used to take me a week of psyching up. Quiet, real shift." },
  { id: "uc-2", name: "Holly E.", role: "Teacher", location: "Leeds", productId: "unstoppable-confidence", image: A.w9, rating: 5,
    text: "I'm an introvert and assumed confidence wasn't really available to me. This has changed that assumption. I'm still introverted — I just don't apologise for myself anymore." },
  { id: "uc-3", name: "Beth Q.", role: "Charity Director", location: "Manchester", productId: "unstoppable-confidence", image: A.w10, rating: 5,
    text: "Started this after a confidence-knocking breakup. Two months later I'm dating again, applied for a promotion, and started writing the book I've sat on for five years. Not coincidence." },
  { id: "uc-4", name: "Will G.", role: "Retired Headmaster", location: "Edinburgh", productId: "unstoppable-confidence", image: A.m9, rating: 5,
    text: "I'm 58 and was a bit cynical about whether this would work at my age. It absolutely does. I feel more myself now than I did at 35." },
  { id: "uc-5", name: "Megan L.", role: "Sales Lead", location: "Glasgow", productId: "unstoppable-confidence", image: A.w1, rating: 5,
    text: "Used this before a big pitch I'd been dreading for weeks. Walked in calm, did the work, won the contract. Doesn't feel like magic — feels like getting out of my own way." },

  // ─── MINDFUL BODY ────────────────────────────────────────
  { id: "mb-1", name: "Sarah J.", role: "Account Director", location: "Bristol", productId: "mindful-body", image: A.w2, rating: 5, featured: true,
    text: "I've stopped having the same fight with myself at 9pm. The cravings haven't disappeared but I'm not at war with them anymore. The inner critic has just quieted down." },
  { id: "mb-2", name: "Chloe B.", role: "Yoga Teacher", location: "Brighton", productId: "mindful-body", image: A.w3, rating: 5,
    text: "After 20 years of yo-yo dieting I just wanted off the cycle. This has helped me reach a place where food is just food again. Hadn't realised how much mental space it was taking up." },
  { id: "mb-3", name: "Adam R.", role: "Property Developer", location: "London", productId: "mindful-body", image: A.m10, rating: 5,
    text: "Not a diet, not a programme telling me what to eat. Just helping me think differently about all of it. That difference is the whole thing." },
  { id: "mb-4", name: "Ellie S.", role: "Nurse", location: "Newcastle", productId: "mindful-body", image: A.w4, rating: 5,
    text: "I look in the mirror differently. Sounds small but if you've spent years not liking what you see, you'll know it isn't." },
  { id: "mb-5", name: "Ryan O.", role: "PT and Fitness Coach", location: "Liverpool", productId: "mindful-body", image: A.m1, rating: 4,
    text: "Bought it expecting weight-loss subliminals (turns out it's not that). Glad it isn't — what it IS has been more valuable. A kinder voice in my head about my body." },

  // ─── MAGNETIC LOVE ───────────────────────────────────────
  { id: "ml-1", name: "Priya M.", role: "Architect", location: "London", productId: "magnetic-love", image: A.w5, rating: 5, featured: true,
    text: "After my divorce I assumed I'd be alone for a while — fine with that. What I didn't expect was to start liking myself again in the meantime. Met someone last month. Not in a hurry." },
  { id: "ml-2", name: "Jonny K.", role: "Engineer", location: "Manchester", productId: "magnetic-love", image: A.m2, rating: 5,
    text: "I have an avoidant attachment style and I know it. This has helped me notice the moments where I'm about to retreat — and choose not to. Slowly rewriting some old habits." },
  { id: "ml-3", name: "Lucy T.", role: "Marketing Lead", location: "Edinburgh", productId: "magnetic-love", image: A.w6, rating: 5,
    text: "Stopped chasing emotionally unavailable people. Turns out that pattern was sitting in me, not in them. Doing the inner work has changed who I'm even attracted to." },
  { id: "ml-4", name: "Sam P.", role: "Solicitor", location: "Cardiff", productId: "magnetic-love", image: A.m3, rating: 5,
    text: "I'm already in a great relationship and got this to be a better partner, not to find one. It's done that. I'm less reactive, more present, more open." },
  { id: "ml-5", name: "Emily B.", role: "Doctor", location: "Bristol", productId: "magnetic-love", image: A.w7, rating: 4,
    text: "Sceptical that affirmations about being lovable would do anything for me. They have. Quietly, gradually — but they have." },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

export function getProductTestimonials(productId: string, limit?: number): Testimonial[] {
  const list = testimonials.filter((t) => t.productId === productId);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getTestimonialCount(productId?: string): number {
  return productId ? testimonials.filter((t) => t.productId === productId).length : testimonials.length;
}
