import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import authRouter from "@/features/auth/api/route";
import usersRouter from "@/features/users/api/route";
import eventsRouter from "@/features/events/api/route";
import websitesRouter from "@/features/websites/api/route";

const app = new Hono().basePath("/api");

app.use("/events", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"]
}));

const routes = app
    .route("/", authRouter)
    .route("/users", usersRouter)
    .route("/events", eventsRouter)
    .route("/websites", websitesRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);

export type AppType = typeof routes;