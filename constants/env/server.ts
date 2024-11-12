import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
    emptyStringAsUndefined: true,
    server: {
        DATABASE_URL: z.string().url(),
        AUTH_URL: z.string().url(),
        AUTH_SECRET: z.string(),
        AUTH_GOOGLE_ID: z.string(),
        AUTH_GOOGLE_SECRET: z.string(),
        EMAIL_SERVER_USER: z.string(),
        EMAIL_SERVER_PASSWORD: z.string(),
        EMAIL_SERVER_HOST: z.string(),
        EMAIL_SERVER_PORT: z.string(),
        EMAIL_FROM: z.string()
    },
    experimental__runtimeEnv: process.env
});