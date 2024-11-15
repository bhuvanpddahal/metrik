import { z } from "zod";

export const addSiteSchema = z.object({
    domain: z.string().min(1, {
        message: "Domain is required"
    }),
    timezone: z.string()
});

export type AddSitePayload = z.infer<typeof addSiteSchema>;