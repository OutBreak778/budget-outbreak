import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, {schema});


const accountData = db.select().from(schema.accounts)