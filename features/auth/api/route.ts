import Google from "@auth/core/providers/google";
import Nodemailer from "@auth/core/providers/nodemailer";
import { eq } from "drizzle-orm";
import { Context, Hono } from "hono";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthConfig, authHandler, initAuthConfig } from "@hono/auth-js";

import { db } from "@/drizzle/db";
import { env } from "@/constants/env/server";
import { UserTable } from "@/drizzle/schema/users";
import { AccountTable } from "@/drizzle/schema/accounts";
import { VerificationTokenTable } from "@/drizzle/schema/verification-tokens";

function getAuthConfig(_c: Context): AuthConfig {
    return {
        secret: env.AUTH_SECRET,
        providers: [
            Google({
                clientId: env.AUTH_GOOGLE_ID,
                clientSecret: env.AUTH_GOOGLE_SECRET
            }),
            Nodemailer({
                server: {
                    host: env.EMAIL_SERVER_HOST,
                    port: env.EMAIL_SERVER_PORT,
                    auth: {
                        user: env.EMAIL_SERVER_USER,
                        pass: env.EMAIL_SERVER_PASSWORD
                    }
                },
                from: env.EMAIL_FROM
            })
        ],
        pages: {
            signIn: "/sign-in",
            error: "/sign-in"
        },
        events: {
            async linkAccount({ user }) {
                await db.update(UserTable)
                    .set({ emailVerified: new Date() })
                    .where(eq(UserTable.id, user.id!));
            }
        },
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.userId = user.id!;
                }
                return token;
            },
            async session({ token, session }) {
                session.user.id = token.userId;
                session.user.name = token.name ?? null;
                session.user.email = token.email!;
                session.user.image = token.picture ?? null;
                return session;
            }
        },
        adapter: DrizzleAdapter(db, {
            usersTable: UserTable,
            accountsTable: AccountTable,
            verificationTokensTable: VerificationTokenTable
        }),
        session: { strategy: "jwt" }
    };
}

const app = new Hono()
    .use("*", initAuthConfig(getAuthConfig))
    .use("*", authHandler());

export default app;