import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/constants/env/server";
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";

export default async function proxy(req: NextRequest) {
    const sessionResponse = await fetch(`${env.AUTH_URL}/session`, {
        headers: {
            Cookie: req.headers.get("cookie") || ""
        }
    });
    // const session = JSON.parse(JSON.stringify(sessionResponse));
    const session = await sessionResponse.json();

    const { nextUrl } = req;
    const isLoggedIn = !!session?.user;
    const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const response = NextResponse.next();

    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign-in"]
};