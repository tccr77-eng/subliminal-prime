// Blog Index Page — "Clarity" Design System
// Apple-inspired: clean, spacious, generous whitespace, editorial typography
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blog";

const blogCategories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category))).sort()];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ background: "#faf9f7" }}>
      {/* Header */}
      <section className="section-py pb-12" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <div className="section-label mb-4">The Journal</div>
            <h1 className="text-5xl lg:text-6xl font-800 text-[#1a1f2e] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              Science, mindset,<br />and the art of change.
            </h1>
            <p className="text-[#4b5563] text-lg leading-relaxed">
              Research-backed articles on subliminal audio, subconscious reprogramming, and the psychology of lasting change.
            </p>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <div style={{ background: "#f2f0ec", borderBottom: "1px solid #e4e2de" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex gap-2 overflow-x-auto pb-4 pt-2 scrollbar-hide">
            {blogCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-600 transition-all"
                style={{
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: activeCategory === cat ? "#1a1f2e" : "white",
                  color: activeCategory === cat ? "white" : "#4b5563",
                  border: activeCategory === cat ? "1px solid #1a1f2e" : "1px solid #e4e2de",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        {filtered.length === 0 ? (
          <p className="text-[#9ca3af] text-center py-20">No articles in this category yet.</p>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <Link href={`/blog/${featured.slug}`}>
                <div className="group cursor-pointer mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden" style={{ background: "white", border: "1px solid #e4e2de" }}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={featured.heroImage}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="section-label">{featured.category}</span>
                      <span className="flex items-center gap-1 text-xs text-[#9ca3af]">
                        <Clock size={11} /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl font-800 text-[#1a1f2e] mb-4 leading-tight group-hover:text-[#4f46e5] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
                      {featured.title}
                    </h2>
                    <p className="text-[#4b5563] leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#9ca3af]">{formatDate(featured.publishedDate)}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-600 text-[#4f46e5]" style={{ fontWeight: 600 }}>
                        Read article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <div className="group cursor-pointer rounded-2xl overflow-hidden h-full flex flex-col" style={{ background: "white", border: "1px solid #e4e2de" }}>
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="section-label">{post.category}</span>
                          <span className="flex items-center gap-1 text-xs text-[#9ca3af]">
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-700 text-[#1a1f2e] mb-3 leading-snug group-hover:text-[#4f46e5] transition-colors flex-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#6b7280] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f0ede8]">
                          <span className="text-xs text-[#9ca3af]">{formatDate(post.publishedDate)}</span>
                          <span className="inline-flex items-center gap-1 text-xs font-600 text-[#4f46e5]" style={{ fontWeight: 600 }}>
                            Read <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <section className="section-py" style={{ background: "#f2f0ec" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Ready to experience it yourself?
          </h2>
          <p className="text-[#4b5563] mb-8 max-w-xl mx-auto">
            Browse our full range of subliminal programs — each one designed around the science you've just read about.
          </p>
          <Link href="/shop">
            <button className="btn-primary">Explore Programs <ArrowRight size={16} /></button>
          </Link>
        </div>
      </section>
    </div>
  );
}
