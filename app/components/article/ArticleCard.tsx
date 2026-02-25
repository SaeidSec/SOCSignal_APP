import Link from "next/link";
import { Shield, Clock, User as UserIcon, ArrowRight } from "lucide-react";

interface ArticleCardProps {
    article: {
        id: string;
        title: string;
        excerpt: string;
        category: string;
        author: string;
        readTime: string;
        date: string;
        slug: string;
        coverImage?: string;
    };
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <div className="glass-panel group relative flex flex-col h-full rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:neon-glow overflow-hidden">
            {/* Cover Image Placeholder / Image */}
            <div className="relative h-48 w-full bg-black/10 dark:bg-white/5 overflow-hidden">
                {article.coverImage ? (
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <Shield className="w-12 h-12 text-[#0d7ff2]" />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#0d7ff2] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#0d7ff2]/20">
                        {article.category}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[11px] text-foreground/40 font-medium uppercase tracking-wider mb-3">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                    <span>•</span>
                    {article.date}
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-3 leading-snug group-hover:text-[#0d7ff2] transition-colors line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>
                        {article.title}
                    </Link>
                </h3>

                <p className="text-sm text-foreground/60 line-clamp-3 mb-6 font-sans leading-relaxed">
                    {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d7ff2] to-blue-900 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-inner">
                            {article.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-foreground/80">{article.author}</span>
                    </div>

                    <Link
                        href={`/articles/${article.slug}`}
                        className="flex items-center gap-1 text-[10px] font-bold text-[#0d7ff2] uppercase tracking-[0.2em] group/btn"
                    >
                        Read <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
