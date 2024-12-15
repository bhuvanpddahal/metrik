import { z } from "zod";

export const domainSchema = z.object({
    domain: z.string().min(1, {
        message: "Domain is required"
    })
});

export type DomainPayload = z.infer<typeof domainSchema>;

export const timezoneSchema = z.object({
    timezone: z.string()
});

export type TimezonePayload = z.infer<typeof timezoneSchema>;