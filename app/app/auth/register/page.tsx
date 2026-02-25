"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Registration successful! Please check your email for verification.");
            router.push("/auth/login");
        }
        setLoading(false);
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
                        <h2 className="text-xl font-semibold text-foreground/90">Join the Collective</h2>
                        <p className="text-foreground/60 text-sm">Create your technical analyst profile</p>
                    </div>
                </div>

                {/* Glassmorphic Register Form */}
                <div className="glass-panel p-6 sm:p-8 rounded-2xl w-full">
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Full Name Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground/70" htmlFor="fullName">
                                Full Name
                            </label>
                            <div className="relative input-focus-glow rounded-lg transition-all duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-foreground/40" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 bg-black/5 dark:bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-0 sm:text-sm transition-colors"
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="block text-sm font-medium text-foreground/70" htmlFor="password">
                                Password
                            </label>
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
                        </div>

                        {/* Primary Action */}
                        <button
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary neon-glow tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-foreground/50 mt-2">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-semibold text-primary hover:text-blue-400 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
