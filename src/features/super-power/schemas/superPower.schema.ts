import z from "zod";

export const superPowerSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const superPowersResponseSchema = z.array(superPowerSchema);
