import { createClient } from "@/lib/supabase/server";
import { Shield, Plus, FileText, CheckCircle, BarChart3, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth/login");
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // Fetch user articles
    const { data: articles } = await supabase
        .from("articles")
        .select("*, category:categories(name)")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

    const publishedCount = articles?.filter(a => a.status === 'published').length || 0;
    const draftCount = articles?.filter(a => a.status === 'draft').length || 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">Author Command Center</h1>
                    <p className="text-foreground/40 text-sm uppercase tracking-widest font-medium">
                        Welcome back, {profile?.full_name || user.email}
                    </p>
                </div>
                <Link
                    href="/dashboard/articles/new"
                    className="px-6 py-3 rounded-xl bg-[#0d7ff2] text-white font-bold hover:bg-blue-600 transition-all neon-glow flex items-center gap-2 uppercase text-xs tracking-widest"
                >
                    <Plus className="w-4 h-4" /> New Technical Article
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: "Published Articles", value: publishedCount, icon: CheckCircle, color: "text-green-500" },
                    { label: "Active Drafts", value: draftCount, icon: FileText, color: "text-[#0d7ff2]" },
                    { label: "Total Views", value: articles?.reduce((acc, a) => acc + (a.view_count || 0), 0) || 0, icon: BarChart3, color: "text-purple-500" },
                ].map((stat) => (
                    <div key={stat.label} className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
                            <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Articles Table/List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-foreground">Content Management</h2>
                    <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Recent Activity</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Views</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm font-sans">
                            {articles && articles.length > 0 ? (
                                articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-foreground group-hover:text-[#0d7ff2] transition-colors">{article.title}</div>
                                            <div className="text-xs text-foreground/40 mt-1">{article.category?.name || "Uncategorized"}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${article.status === 'published' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-[#0d7ff2]/10 border-[#0d7ff2]/20 text-[#0d7ff2]'
                                                }`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-foreground/60">{article.view_count || 0}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/dashboard/articles/${article.id}/edit`} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-foreground/40 hover:text-[#0d7ff2]">
                                                    <SettingsIcon className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-foreground/40 italic">
                                        No research articles published yet. <br />
                                        Start by clicking "New Technical Article" above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
