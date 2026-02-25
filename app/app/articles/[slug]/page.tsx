import { Shield, Clock, User as UserIcon, Calendar, ArrowLeft, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import { getArticleBySlug } from "@/lib/actions/fetch";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const article = await getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    // Helper to render Editor.js content (Simplified for now, in a real app this would be a separate component)
    const renderContent = (content: any) => {
        if (!content || !content.blocks) return null;
        return content.blocks.map((block: any, idx: number) => {
            switch (block.type) {
                case 'paragraph':
                    return <p key={idx} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                case 'header':
                    const Tag = `h${block.data.level}` as any;
                    return <Tag key={idx} dangerouslySetInnerHTML={{ __html: block.data.text }} className="font-display font-bold" />;
                case 'list':
                    const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                    return (
                        <ListTag key={idx}>
                            {block.data.items.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                        </ListTag>
                    );
                case 'code':
                    return (
                        <div key={idx} className="relative group">
                            <pre className="overflow-x-auto">
                                <code className="text-[#0d7ff2]">{block.data.code}</code>
                            </pre>
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <article className="min-h-screen pb-24">
            {/* Article Header / Hero */}
            <header className="relative pt-16 pb-12 overflow-hidden border-b border-white/5 bg-black/20">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link href="/articles" className="inline-flex items-center gap-2 text-xs font-bold text-[#0d7ff2] uppercase tracking-widest mb-8 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Articles
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-md bg-[#0d7ff2]/10 border border-[#0d7ff2]/20 text-[#0d7ff2] text-[10px] font-bold uppercase tracking-widest">
                            {article.category?.name || "Technical"}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0d7ff2] to-blue-900 border border-white/10 flex items-center justify-center font-bold text-white text-lg overflow-hidden">
                                {article.author?.avatar_url ? (
                                    <img src={article.author.avatar_url} alt={article.author.full_name} className="w-full h-full object-cover" />
                                ) : (
                                    article.author?.full_name?.charAt(0) || "U"
                                )}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-foreground">{article.author?.full_name || article.author?.username}</div>
                                <div className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">Research Associate</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-medium">
                                <Calendar className="w-3.5 h-3.5" /> {new Date(article.published_at || article.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-medium">
                                <Clock className="w-3.5 h-3.5" /> {article.read_time || 5} min read
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="p-2.5 rounded-lg glass-panel hover:text-[#0d7ff2] transition-colors border-white/10">
                                <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 rounded-lg glass-panel hover:text-[#0d7ff2] transition-colors border-white/10">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-invert prose-blue max-w-none transition-all
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl 
            prose-p:text-foreground/70 prose-p:leading-relaxed prose-p:text-lg
            prose-code:text-[#0d7ff2] prose-code:bg-[#0d7ff2]/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-xl prose-pre:p-6
            prose-blockquote:border-l-4 prose-blockquote:border-[#0d7ff2] prose-blockquote:bg-[#0d7ff2]/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl">
                    {renderContent(article.content)}
                </div>
            </main>
        </article>
    );
}
