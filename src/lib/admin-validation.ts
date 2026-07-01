import { z } from "zod";
import { RequestStatus, AdminRole } from "@prisma/client";

const turnstileTokenSchema = z.string().max(2048).optional().or(z.literal(""));

export const adminLoginSchema = z.object({
  email: z.string().email().max(320).trim().toLowerCase(),
  password: z.string().min(8).max(128),
  totpCode: z.string().regex(/^\d{6}$/).optional().or(z.literal("")),
  turnstileToken: turnstileTokenSchema,
});

export const adminCreateUserSchema = z.object({
  email: z.string().email().max(320).trim().toLowerCase(),
  name: z.string().trim().min(1).max(200),
  password: z.string().min(12).max(128),
  role: z.nativeEnum(AdminRole).default("ADMIN"),
});

export const adminMfaEnableSchema = z.object({
  totpCode: z.string().regex(/^\d{6}$/),
  secret: z.string().min(16).max(100),
});

export const adminMfaDisableSchema = z.object({
  totpCode: z.string().regex(/^\d{6}$/),
  password: z.string().min(8).max(128),
});

export const adminUpdateSchema = z.object({
  status: z.nativeEnum(RequestStatus).optional(),
  adminNotes: z.string().max(5000).optional().nullable(),
});

export const adminListQuerySchema = z.object({
  status: z.nativeEnum(RequestStatus).optional(),
});

export { turnstileTokenSchema };
