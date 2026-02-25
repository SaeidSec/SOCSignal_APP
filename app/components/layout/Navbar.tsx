"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Shield, Search, Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Articles", href: "/articles" },
        { name: "Categories", href: "/categories" },
        { name: "Authors", href: "/authors" },
    ];

    return (
        <nav className="fixed w-full z-50 glass-panel border-b border-white/10 dark:border-white/5 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0d7ff2] to-blue-900 flex items-center justify-center shadow-lg group-hover:neon-glow transition-all">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-foreground">
                                SOCSignals
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-foreground/80 hover:text-foreground hover:text-[#0d7ff2] transition-colors text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4 border-l border-white/10 pl-4">
                            <button aria-label="Search" className="text-foreground/80 hover:text-[#0d7ff2] transition-colors">
                                <Search className="w-5 h-5" />
                            </button>

                            {mounted && (
                                <button
                                    aria-label="Toggle Dark Mode"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="text-foreground/80 hover:text-[#0d7ff2] transition-colors"
                                >
                                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                            )}

                            <Link
                                href="/auth/login"
                                className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0d7ff2] text-white hover:bg-blue-600 neon-glow transition-all"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center space-x-4">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="text-foreground/80 hover:text-[#0d7ff2]"
                            >
                                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-foreground/80 hover:text-foreground"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-panel border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-white/5"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/auth/login"
                            className="mt-4 block w-full text-center px-4 py-2 text-base font-semibold rounded-lg bg-[#0d7ff2] text-white hover:bg-blue-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
