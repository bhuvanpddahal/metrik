import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";
import Toasters from "@/components/Toasters";
import Providers from "@/components/Providers";
import { Fustat } from "./fonts";

export const metadata: Metadata = {
    title: "Metrik",
    description: "Web analytics tool that enables you to unlock the power of your web data"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script defer data-website-id="0e91aefd-5046-430e-87bb-4b176cdca555" data-domain="apex-guard.vercel.app" src="http://localhost:3000/js/script.js"></script>
            </head>
            <body className={`${Fustat.className} antialiased`}>
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