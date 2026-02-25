import { Shield, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getArticles } from "@/lib/actions/fetch";

export default async function Home() {
  const articles = await getArticles(6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#0d7ff2]/20 rounded-[100%] blur-[120px] -z-10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-white/10 text-xs font-bold text-[#0d7ff2] mb-10 uppercase tracking-widest">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d7ff2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d7ff2]"></span>
            </span>
            Enterprise Edition v2.0
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-foreground mb-8 leading-[0.9]">
            CYBERSECURITY <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d7ff2] via-blue-400 to-[#0d7ff2] bg-[length:200%_auto] animate-gradient">INFRASTRUCTURE</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-foreground/60 mb-12 font-sans leading-relaxed">
            The professional publishing engine for SOC Analysts and Security Engineers. <br className="hidden sm:block" />
            High-performance research, community validation, and technical depth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/articles" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#0d7ff2] text-white font-bold hover:bg-blue-600 transition-all neon-glow flex items-center justify-center gap-2 uppercase text-xs tracking-[0.2em]">
              Access Intelligence <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/register" className="w-full sm:w-auto px-10 py-4 rounded-xl glass-panel hover:bg-white/5 transition-all font-bold flex items-center justify-center text-xs uppercase tracking-[0.2em]">
              Join the Hub
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Intelligence Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-end justify-between mb-12 border-l-4 border-[#0d7ff2] pl-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">Latest Intelligence</h2>
              <p className="text-foreground/40 text-sm mt-1 uppercase tracking-widest font-medium">Validated Technical Research</p>
            </div>
            <Link href="/articles" className="text-xs font-bold text-[#0d7ff2] uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
              Browse All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <ArticleCard
                  key={article.id}
                  article={{
                    id: article.id,
                    title: article.title,
                    excerpt: article.excerpt || "No summary available.",
                    category: article.category?.name || "Technical",
                    author: article.author?.full_name || article.author?.username || "Unknown",
                    readTime: `${article.read_time || 5} min read`,
                    date: new Date(article.published_at || article.created_at).toLocaleDateString(),
                    slug: article.slug,
                    coverImage: article.cover_image,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-white/5">
              <Shield className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
              <p className="text-foreground/40 font-medium tracking-widest uppercase text-xs">Awaiting first research publication...</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust / Stats Bar */}
      <section className="py-12 glass-panel border-y border-white/5 mx-4 sm:mx-8 lg:mx-24 rounded-3xl mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Analysts", value: "2.4k+" },
            { label: "Technical Papers", value: "850+" },
            { label: "SOC Playbooks", value: "120+" },
            { label: "Security Orgs", value: "45" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-display font-extrabold text-[#0d7ff2] tracking-tight">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold text-foreground/40 uppercase tracking-[0.2em] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
