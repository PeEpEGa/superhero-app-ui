import { queryOptions } from "@tanstack/react-query";
import { getSuperheroById } from "../client/superhero.api";

export const superheroByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["superheroes", id],
    queryFn: () => getSuperheroById(id),
  });
