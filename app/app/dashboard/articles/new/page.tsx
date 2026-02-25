"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Shield, Save, Rocket, Settings, ChevronLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// Dynamically import the editor with no SSR
const Editor = dynamic(() => import('@/components/cms/Editor'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[500px] flex items-center justify-center bg-white/5 rounded-xl border border-white/5 animate-pulse">
            <div className="text-foreground/40 font-medium">Initializing Editor...</div>
        </div>
    )
});

export default function NewArticlePage() {
    const [title, setTitle] = useState("");
    const [editorData, setEditorData] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    const handleSaveDraft = () => {
        setSaving(true);
        // Simulate auto-save
        setTimeout(() => {
            toast.success("Draft saved to cloud");
            setSaving(false);
        }, 1000);
    };

    const handlePublish = () => {
        if (!title) {
            toast.error("Title is required before publishing");
            return;
        }
        toast.success("Article in moderation queue");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Editor Header */}
            <header className="fixed top-16 left-0 right-0 z-40 glass-panel border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-foreground/60">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                    <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest hidden sm:block">Drafting Mode</span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSaveDraft}
                        disabled={saving}
                        className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-white transition-all flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Draft"}
                    </button>
                    <button className="p-2 rounded-lg glass-panel hover:text-[#0d7ff2] border-white/10 transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg glass-panel hover:text-[#0d7ff2] border-white/10 transition-colors">
                        <Settings className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handlePublish}
                        className="px-6 py-2 rounded-lg bg-[#0d7ff2] text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 neon-glow transition-all flex items-center gap-2"
                    >
                        <Rocket className="w-4 h-4" /> Publish
                    </button>
                </div>
            </header>

            {/* Editor Workspace */}
            <main className="max-w-4xl mx-auto px-4 pt-40 pb-20">
                <textarea
                    placeholder="Enter Article Title"
                    className="w-full bg-transparent text-4xl md:text-6xl font-display font-bold border-none outline-none resize-none placeholder:text-foreground/10 mb-8"
                    rows={1}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="min-h-[600px] pb-32">
                    <Editor
                        holder="editor-root"
                        onChange={setEditorData}
                        data={editorData}
                    />
                </div>
            </main>

            {/* Floating Status Bar */}
            <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 glass-panel rounded-full px-6 py-3 border border-white/10 shadow-2xl flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Active Session</span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                    Word Count: <span className="text-foreground">0</span>
                </div>
                <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                    Read Time: <span className="text-foreground">1 min</span>
                </div>
            </footer>
        </div>
    );
}
