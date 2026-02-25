"use client";

import { Toaster } from "react-hot-toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1a1f24',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '14px',
                    },
                }}
            />
            {children}
        </>
    );
}
