import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";
import { env } from "@/constants/env/server";

const sql = neon(env.DATABASE_URL);
export const db = drizzle({ client: sql, schema });