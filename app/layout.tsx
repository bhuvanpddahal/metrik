import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DM_Mono, Google_Sans } from "next/font/google";

import "@/app/globals.css";
import Toasters from "@/components/Toasters";
import Providers from "@/components/Providers";
import { env as clientEnv } from "@/constants/env/client";
import { env as serverEnv } from "@/constants/env/server";
import { sharedOpenGraph } from "@/constants/shared-metadata";
import { getDomainNameFromUrl } from "@/features/websites/utils";

const googleSans = Google_Sans({
    variable: "--font-google-sans",
    axes: ["opsz"],
    subsets: ["latin"]
});

const dmMono = DM_Mono({
    variable: "--font-dm-mono",
    weight: ["300", "400", "500"],
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: {
        template: "%s | Metrik",
        default: "Metrik | Powerful insights for your website"
    },
    description: "Web analytics tool that enables you to unlock the power of your web data",
    openGraph: {
        ...sharedOpenGraph,
        title: "Metrik | Powerful insights for your website",
        description: "Web analytics tool that enables you to unlock the power of your web data"
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const color = "hsl(var(--primary))";
    const appUrl = clientEnv.NEXT_PUBLIC_APP_URL;

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    defer
                    data-website-id={serverEnv.METRIK_WEBSITE_ID}
                    data-domain={getDomainNameFromUrl(appUrl)}
                    src={`${appUrl}/js/script.js`}
                />
            </head>
            <body className={`${googleSans.className} ${dmMono.variable} antialiased`}>
                <NextTopLoader
                    color={color}
                    showSpinner={false}
                    shadow={`0 0 10px ${color}, 0 0 5px ${color}`}
                />
                <Providers>
                    <NuqsAdapter>
                        {children}
                    </NuqsAdapter>
                </Providers>
                <Toasters />
            </body>
        </html>
    );
}