import z from "zod";
import { paginationSchema } from "../../../shared/schemas/pagination.schema";

export const superPowerSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const imageSchema = z.object({
  id: z.number(),
  url: z.url(),
  uploadedAt: z.string(),
  superheroId: z.number(),
});

export const superheroSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  realName: z.string().optional(),
  originDescription: z.string(),
  catchPhrase: z.string().optional(),
  type: z.enum(["HERO", "VILLAIN"]),
  createdAt: z.string(),
  superPowers: z.array(superPowerSchema),
  images: z.array(imageSchema),
});

export const superheroesResponseSchema = z.object({
  data: z.array(superheroSchema),
  pagination: paginationSchema,
});
