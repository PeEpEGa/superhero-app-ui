import type z from "zod";
import type { superheroSchema } from "../schemas/superhero.schema";

export type Superhero = z.infer<typeof superheroSchema>;
