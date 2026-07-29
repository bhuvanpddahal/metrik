import { hc } from "hono/client";

import { env } from "@/constants/env/client";
import type { AppType } from "@/app/api/[[...route]]/route";
import { cn } from "./utils";

cn();

export const client = hc<AppType>(env.NEXT_PUBLIC_APP_URL);