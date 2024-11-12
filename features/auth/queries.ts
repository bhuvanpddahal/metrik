"use server";

import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";

import { UserTable } from "@/drizzle/schema/users";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.email, email)
        });

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};