// =============================================================
// SUBLIMINAL PRIME — Product Download URLs
// =============================================================
// Maps each product ID to its name and the direct download URL.
//
// SECURITY: The download URLs use long, unguessable suffixes so they
// cannot be discovered by typing common patterns into a browser. Treat
// these URLs like passwords — do not log them, do not share them in
// public Slack channels or screenshots.
//
// ⚠️  Before going live: replace every "REPLACE-WITH-..." URL below with
// the real Bunny CDN URL for that product's MP3 file. Use random,
// hard-to-guess filenames (e.g. include a UUID).
//
// Bundles list their constituent product IDs in the `bundleContents`
// field; the webhook expands bundles and sends links for each item.

export interface DownloadInfo {
  name: string;
  /** Direct URL to the MP3 (or zip for bundles). Empty string if not yet uploaded. */
  downloadUrl: string;
  /** For bundles only — list of product IDs included in the bundle. */
  bundleContents?: string[];
}

export const productDownloads: Record<string, DownloadInfo> = {
  // ── Individual programs ──────────────────────────────────────
  "elite-focus": {
    name: "Elite Focus",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-elite-focus.mp3",
  },
  "unshakeable-confidence": {
    name: "Unshakeable Confidence",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-unshakeable-confidence.mp3",
  },
  "wealth-abundance": {
    name: "Wealth & Abundance",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-wealth-abundance.mp3",
  },
  "entrepreneurial-mindset": {
    name: "Entrepreneurial Mindset",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-entrepreneurial-mindset.mp3",
  },
  "peak-athletic-performance": {
    name: "Peak Athletic Performance",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-peak-athletic-performance.mp3",
  },
  "accelerated-learning": {
    name: "Accelerated Learning",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-accelerated-learning.mp3",
  },
  "master-public-speaking": {
    name: "Master Public Speaking",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-master-public-speaking.mp3",
  },
  "deep-sleep": {
    name: "Deep Sleep",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-deep-sleep.mp3",
  },
  "social-charisma": {
    name: "Social Charisma",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-social-charisma.mp3",
  },
  "stress-resilience": {
    name: "Stress Resilience",
    downloadUrl: "https://subliminalprime.b-cdn.net/downloads/REPLACE-WITH-stress-resilience.mp3",
  },

  // ── Bundles ───────────────────────────────────────────────────
  "founders-focus-pack": {
    name: "Founder's Focus Pack",
    downloadUrl: "",
    bundleContents: ["elite-focus", "entrepreneurial-mindset", "stress-resilience"],
  },
  "peak-performer-bundle": {
    name: "Peak Performer Bundle",
    downloadUrl: "",
    bundleContents: ["elite-focus", "peak-athletic-performance", "unshakeable-confidence", "stress-resilience"],
  },
  "complete-collection": {
    name: "Complete Collection",
    downloadUrl: "",
    bundleContents: [
      "elite-focus",
      "unshakeable-confidence",
      "wealth-abundance",
      "entrepreneurial-mindset",
      "peak-athletic-performance",
      "accelerated-learning",
      "master-public-speaking",
      "deep-sleep",
      "social-charisma",
      "stress-resilience",
    ],
  },
};

/**
 * Expand a list of purchased product IDs into a flat list of downloadable items.
 * Bundles are expanded to their constituent products; duplicates are removed.
 */
export function resolveDownloads(productIds: string[]): Array<{ id: string; name: string; downloadUrl: string }> {
  const seen = new Set<string>();
  const result: Array<{ id: string; name: string; downloadUrl: string }> = [];

  for (const id of productIds) {
    const item = productDownloads[id];
    if (!item) continue;

    if (item.bundleContents && item.bundleContents.length > 0) {
      // Expand bundle into individual products
      for (const childId of item.bundleContents) {
        if (seen.has(childId)) continue;
        const child = productDownloads[childId];
        if (!child) continue;
        seen.add(childId);
        result.push({ id: childId, name: child.name, downloadUrl: child.downloadUrl });
      }
    } else {
      if (seen.has(id)) continue;
      seen.add(id);
      result.push({ id, name: item.name, downloadUrl: item.downloadUrl });
    }
  }

  return result;
}
