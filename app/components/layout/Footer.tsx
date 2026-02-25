import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-black/5 dark:border-white/5 bg-background-light dark:bg-background-dark mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#0d7ff2] to-blue-900 flex items-center justify-center shadow">
                                <Shield className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="font-display font-bold text-lg text-foreground">
                                SOCSignals
                            </span>
                        </Link>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                            The premier knowledge infrastructure and research publishing platform tailored for modern SOC professionals and threat hunters.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-3 hidden-links-container">
                            <li><Link href="/articles" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Articles</Link></li>
                            <li><Link href="/categories" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Categories</Link></li>
                            <li><Link href="/authors" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Authors</Link></li>
                            <li><Link href="/search" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Search</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Community</h3>
                        <ul className="space-y-3">
                            <li><Link href="/dashboard" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Author Dashboard</Link></li>
                            <li><Link href="/guidelines" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Publishing Guidelines</Link></li>
                            <li><a href="#" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Discord Server</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-foreground/60 hover:text-[#0d7ff2] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-foreground/40">
                        &copy; {new Date().getFullYear()} SOCSignals. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <span className="text-xs text-foreground/40 float-right">Enterprise Edition v2.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
