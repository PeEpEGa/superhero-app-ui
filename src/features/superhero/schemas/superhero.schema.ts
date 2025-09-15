import z from "zod";
import { paginationSchema } from "../../../shared/schemas/pagination.schema";
import { superPowerSchema } from "../../super-power/schemas/superPower.schema";

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

export const createSuperheroSchema = z.object({
  nickname: z.string().min(1),
  realName: z.string().nullable().optional(),
  originDescription: z.string().min(1),
  catchPhrase: z.string().nullable().optional(),
  type: z.enum(["HERO", "VILLAIN"]),
  superPowers: z
    .object({
      superPowerIdsToAdd: z.array(z.number()).optional(),
      newSuperPowers: z.array(z.object({ name: z.string().min(1) })).optional(),
    })
    .optional(),
});
