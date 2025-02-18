import { env } from "./env/client";

const baseUrl = env.NEXT_PUBLIC_APP_URL;

export const sharedOpenGraph = {
    siteName: "Metrik",
    images: [
        `${baseUrl}/images/og.png`
    ]
};