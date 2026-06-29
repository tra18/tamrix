import { z } from "zod";
import { RequestStatus } from "@prisma/client";

export const adminLoginSchema = z.object({
  password: z.string().min(8).max(128),
});

export const adminUpdateSchema = z.object({
  status: z.nativeEnum(RequestStatus).optional(),
  adminNotes: z.string().max(5000).optional().nullable(),
});
