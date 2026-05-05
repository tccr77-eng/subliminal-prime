// Blog Article Page — "Clarity" Design System
// Apple-inspired: clean, spacious, editorial typography
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Clock, ExternalLink } from "lucide-react";
import { blogPosts } from "@/lib/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  const related = blogPosts
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 3)
    .concat(blogPosts.filter(p => p.slug !== slug && p.category !== post?.category).slice(0, Math.max(0, 3 - blogPosts.filter(p => p.slug !== slug && p.category === post?.category).length)));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#faf9f7" }}>
        <h1 className="text-3xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Article not found</h1>
        <Link href="/blog"><button className="btn-primary">Back to Journal</button></Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#faf9f7" }}>
      {/* Hero */}
      <div className="relative" style={{ height: "clamp(300px, 50vw, 520px)" }}>
        <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[860px] mx-auto w-full px-5 sm:px-8 pb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-600 text-white" style={{ background: "rgba(255,255,255,0.2)", fontWeight: 600, backdropFilter: "blur(8px)" }}>{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-white/70">
                <Clock size={11} /> {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-800 text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
              {post.title}
            </h1>
            <p className="text-white/70 text-sm mt-3">{formatDate(post.publishedDate)}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "#f2f0ec", borderBottom: "1px solid #e4e2de" }}>
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-4">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#1a1f2e] transition-colors">
              <ArrowLeft size={14} /> Back to The Journal
            </button>
          </Link>
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-[860px] mx-auto px-5 sm:px-8 py-14">
        <p className="text-xl text-[#374151] leading-relaxed mb-10 font-400" style={{ borderLeft: "3px solid #4f46e5", paddingLeft: "1.25rem" }}>
          {post.excerpt}
        </p>
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            color: "#374151",
            lineHeight: "1.85",
            fontSize: "1.0625rem",
          }}
        />
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-py" style={{ background: "#f2f0ec" }}>
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-800 text-[#1a1f2e] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Continue reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.slice(0, 3).map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <div className="group cursor-pointer rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #e4e2de" }}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <span className="section-label mb-3 block">{p.category}</span>
                      <h3 className="text-base font-700 text-[#1a1f2e] mb-2 leading-snug group-hover:text-[#4f46e5] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0ede8]">
                        <span className="text-xs text-[#9ca3af]">{p.readTime}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-600 text-[#4f46e5]" style={{ fontWeight: 600 }}>
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-py">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-800 text-[#1a1f2e] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>
            Ready to put this into practice?
          </h2>
          <p className="text-[#4b5563] mb-8 max-w-xl mx-auto">
            Explore our subliminal programs — each built on the science you've just read about.
          </p>
          <Link href="/shop">
            <button className="btn-primary">Browse Programs <ArrowRight size={16} /></button>
          </Link>
        </div>
      </section>
    </div>
  );
}
