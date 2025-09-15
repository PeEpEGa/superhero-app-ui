import { useSuspenseQuery } from "@tanstack/react-query";
import { superheroByIdQueryOptions } from "../queries/superheroByIdQueryOptions";

import SuperheroDetail from "../components/SuperheroDetail";
import { Route } from "../../../routes/superheroes/$id";

export default function SuperheroDetailPage() {
  const { id } = Route.useParams();
  const { data: superhero } = useSuspenseQuery(
    superheroByIdQueryOptions(Number(id))
  );

  if (!superhero) return <div>Superhero not found</div>;

  return <SuperheroDetail superhero={superhero} />;
}
