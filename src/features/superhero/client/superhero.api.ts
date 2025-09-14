import {
  superheroesResponseSchema,
  superheroSchema,
} from "../schemas/superhero.schema";
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

export async function getSuperheroById(id: number) {
  const url = `${apiBaseUrl}${endpoints.getSuperheroById}${id}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to get a superhero by ID");
  }

  const data = await res.json();

  return superheroSchema.parse(data);
}
