import { superheroesResponseSchema } from "../schemas/superhero.schema";
import { endpoints } from "./endpoints";

const apiBaseUrl = endpoints.baseUrl;

export async function getSuperheroesPaginated(
  page: number = 1,
  limit: number = 5
) {
  const baseUrl = `${apiBaseUrl}${endpoints.getSuperheroesPaginated}`;
  const query = `?&page=${page}&limit=${limit}`;

  const res = await fetch(`${baseUrl}${query}`);

  if (!res.ok) {
    throw new Error("Failed to get a list of superheroes");
  }

  const data = await res.json();

  return superheroesResponseSchema.parse(data);
}
