import type z from "zod";
import type { superPowerSchema } from "../schemas/superPower.schema";

export type SuperPower = z.infer<typeof superPowerSchema>;
