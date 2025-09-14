import { useSuspenseQuery } from "@tanstack/react-query";
import { superheroByIdQueryOptions } from "../queries/superheroByIdQueryOptions";
import { Route } from "../../../routes/superheroes/$id";
import SuperheroDetail from "../components/SuperheroDetail";

export default function SuperheroDetailPage() {
  const { id } = Route.useParams();
  const { data: superhero } = useSuspenseQuery(
    superheroByIdQueryOptions(Number(id))
  );

  if (!superhero) return <div>Superhero not found</div>;

  return <SuperheroDetail superhero={superhero} />;
}
