import { z } from "zod";

import { addSiteSchema } from "@/features/websites/schemas";

export const domainSchema = addSiteSchema.pick({ domain: true });
export type DomainPayload = z.infer<typeof domainSchema>;

export const timezoneSchema = addSiteSchema.pick({ timezone: true });
export type TimezonePayload = z.infer<typeof timezoneSchema>;