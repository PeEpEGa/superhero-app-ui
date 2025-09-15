import {
  superheroesResponseSchema,
  superheroSchema,
} from "../schemas/superhero.schema";
import type { CreateSuperheroPayload } from "../types/superhero.interface";
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

export async function createSuperhero(superhero: CreateSuperheroPayload) {
  const url = `${apiBaseUrl}${endpoints.createSuperhero}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(superhero),
  });

  if (!res.ok) {
    throw new Error("Failed to create new superhero");
  }

  const data = await res.json();

  return superheroSchema.parse(data);
}

export async function addSuperheroImages(
  superheroId: number,
  images: { file: File }[]
) {
  const url = `${apiBaseUrl}/superheroes/${superheroId}/images`;

  const formData = new FormData();
  images.forEach((img) => {
    if (img.file) {
      formData.append("images", img.file);
    }
  });

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to add images to superhero");
  }

  return await res.json();
}
