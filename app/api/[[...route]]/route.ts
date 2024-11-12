import { Hono } from "hono";
import { handle } from "hono/vercel";

import authRouter from "@/features/auth/api/route";

const app = new Hono().basePath("/api");

const routes = app
    .route("/auth", authRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;