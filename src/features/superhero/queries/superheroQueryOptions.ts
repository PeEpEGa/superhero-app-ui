import { queryOptions } from "@tanstack/react-query";
import { getSuperheroesPaginated } from "../client/superhero.api";

export const superheroQueryOptions = (page: number, limit: number) =>
  queryOptions({
    queryKey: ["superheroes", page, limit],
    queryFn: () => getSuperheroesPaginated(page, limit),
  });
