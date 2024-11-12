import { z } from "zod";

export const signinSchema = z.object({
    email: z.string().email({
        message: "Email is invalid"
    })
});

export type SigninPayload = z.infer<typeof signinSchema>;