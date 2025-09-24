import { NextRequest, NextResponse } from "next/server";

import {
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    protectedRoutes
} from "@/routes";
import { env } from "@/constants/env/server";

const matcher = [...protectedRoutes, ...authRoutes];

export default async function middleware(req: NextRequest) {
    const sessionRequest = await fetch(`${env.AUTH_URL}/session`, {
        headers: {
            Cookie: req.headers.get("cookie") || ""
        }
    });
    // const session = JSON.parse(JSON.stringify(sessionRequest));
    const session = await sessionRequest.json();

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

export const config = { matcher };