import { z } from "zod";
import { locales } from "@/i18n/config";

const localeSchema = z.enum(locales);
const emailSchema = z.string().email().max(320).trim().toLowerCase();
const shortText = z.string().trim().min(1).max(200);
const optionalPhone = z.string().trim().max(30).optional().or(z.literal(""));

const honeypotSchema = z
  .string()
  .max(200)
  .optional()
  .or(z.literal(""));

export const quoteRequestSchema = z.object({
  locale: localeSchema,
  company: shortText,
  contactName: shortText,
  email: emailSchema,
  phone: optionalPhone,
  website: honeypotSchema,
  projectSlugs: z.array(z.string().max(80)).max(10),
  customProject: z.boolean(),
  sector: z.string().trim().min(1).max(50),
  companySize: z.string().trim().min(1).max(20),
  description: z.string().trim().min(20).max(5000),
  modules: z.array(z.string().max(50)).min(1).max(20),
  userCount: z.string().trim().min(1).max(20),
  integrations: z.array(z.string().max(50)).max(20),
  needsMobile: z.boolean(),
  needsMultiSite: z.boolean(),
  existingSystems: z.string().trim().max(2000).optional().or(z.literal("")),
  timeline: z.string().trim().min(1).max(20),
  complexity: z.enum(["simple", "standard", "advanced", "enterprise"]),
  specification: z.object({
    project: z.string().max(10000),
    needs: z.string().max(10000),
    technical: z.string().max(10000),
    planning: z.string().max(10000),
  }),
});

export const orderRequestSchema = z.object({
  locale: localeSchema,
  appSlug: z.string().trim().min(1).max(80),
  appName: shortText,
  company: shortText,
  contactName: shortText,
  email: emailSchema,
  phone: optionalPhone,
  website: honeypotSchema,
  plan: z.enum(["standard", "pro", "enterprise"]),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type OrderRequestInput = z.infer<typeof orderRequestSchema>;
