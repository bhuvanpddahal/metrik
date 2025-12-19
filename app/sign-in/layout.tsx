import type { Metadata } from "next";

import SeasonalSnowfall from "@/app/_components/SeasonalSnowfall";
import { sharedOpenGraph } from "@/constants/shared-metadata";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Sign In",
    openGraph: {
        ...sharedOpenGraph,
        title: "Sign In | Metrik",
        description: "Sign up for Metrik to unlock the power of your web data"
    }
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <>
            <main className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-[radial-gradient(hsl(0,72%,35%,40%),hsl(24,62%,27%,40%),hsl(var(--background))_60%)]">
                {children}
            </main>
            <SeasonalSnowfall snowflakeCount={30} />
        </>
    );
};

export default AuthLayout;