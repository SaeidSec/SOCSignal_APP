"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, Lock, Eye, EyeOff, Github } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged in successfully!");
            router.push("/dashboard");
        }
        setLoading(false);
    };

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) toast.error(error.message);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Main Container */}
            <div className="w-full max-w-[400px] z-10 flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4 mb-2">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-blue-900 flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">SOCSignals</h1>
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-foreground/90">Welcome Back</h2>
                        <p className="text-foreground/60 text-sm">Secure access to the operations center</p>
                    </div>
                </div>

                {/* Glassmorphic Login Form */}
                <div className="glass-panel p-6 sm:p-8 rounded-2xl w-full">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground/70" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative input-focus-glow rounded-lg transition-all duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-foreground/40" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 bg-black/5 dark:bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-0 sm:text-sm transition-colors"
                                    id="email"
                                    type="email"
                                    placeholder="analyst@socsignals.io"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-foreground/70" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="relative input-focus-glow rounded-lg transition-all duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-foreground/40" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-10 py-3 bg-black/5 dark:bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-0 sm:text-sm transition-colors"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/40 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="flex justify-end pt-1">
                                <Link href="#" className="text-xs font-medium text-primary hover:text-blue-400 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Primary Action */}
                        <button
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary neon-glow tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Social Auth */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-foreground/50 text-xs uppercase tracking-wider">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleOAuthLogin('google')}
                                className="flex items-center justify-center w-full px-4 py-2.5 border border-white/10 rounded-lg shadow-sm bg-black/5 dark:bg-white/5 text-sm font-medium text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path d="M12.0003 20.45c-4.6667 0-8.45-3.7833-8.45-8.45 0-4.6667 3.7833-8.45 8.45-8.45 2.2833 0 4.2.8333 5.6667 2.2l-2.25 2.25c-.8667-.8333-1.9667-1.3-3.4167-1.3-2.9167 0-5.2833 2.3667-5.2833 5.3 0 2.9333 2.3667 5.3 5.2833 5.3 2.6833 0 4.4667-1.9333 4.6167-4.55h-4.6167v-2.9h7.7167c.0833.5.1167 1.0167.1167 1.5667 0 4.75-3.1667 8.1333-7.8334 8.1333z" fill="currentColor"></path>
                                </svg>
                                Google
                            </button>
                            <button
                                onClick={() => handleOAuthLogin('github')}
                                className="flex items-center justify-center w-full px-4 py-2.5 border border-white/10 rounded-lg shadow-sm bg-black/5 dark:bg-white/5 text-sm font-medium text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                            >
                                <Github className="h-5 w-5 mr-2" />
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-foreground/50 mt-2">
                    New to SOCSignals?{" "}
                    <Link href="/auth/register" className="font-semibold text-primary hover:text-blue-400 transition-colors">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
