import { defineConfig } from "drizzle-kit";

import { env } from "@/constants/env/server";

export default defineConfig({
    schema: "./drizzle/schema",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    strict: true,
    verbose: true,
    dbCredentials: {
        url: env.DATABASE_URL
    }
});