import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/components/Providers";
import { Fustat } from "./fonts";
import { Toaster } from "@/components/ui/Toaster";

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
            <body className={`${Fustat.className} antialiased`}>
                <Providers>
                    {children}
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}