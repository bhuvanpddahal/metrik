"use client";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "@hono/auth-js/react";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    const queryClient = new QueryClient();

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;