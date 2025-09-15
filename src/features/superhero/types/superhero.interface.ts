import type z from "zod";
import type {
  createSuperheroSchema,
  superheroSchema,
} from "../schemas/superhero.schema";

export type Superhero = z.infer<typeof superheroSchema>;
export type CreateSuperheroPayload = z.infer<typeof createSuperheroSchema>;
