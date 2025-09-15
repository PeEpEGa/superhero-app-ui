import { superPowersResponseSchema } from "../schemas/superPower.schema";
import { endpoints } from "./endpoints";

const apiBaseUrl = endpoints.baseUrl;

export async function getAllSuperPowers() {
  const url = `${apiBaseUrl}${endpoints.getAllSuperPowers}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch all super powers");
  }

  const data = await res.json();

  return superPowersResponseSchema.parse(data);
}
