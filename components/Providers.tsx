"use client";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { SessionProvider } from "@hono/auth-js/react";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    const queryClient = new QueryClient();

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;