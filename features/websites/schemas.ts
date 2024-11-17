import { z } from "zod";

export const addSiteSchema = z.object({
    websiteId: z.string().optional(),
    domain: z.string().min(1, {
        message: "Domain is required"
    }),
    timezone: z.string()
});

export type AddSitePayload = z.infer<typeof addSiteSchema>;