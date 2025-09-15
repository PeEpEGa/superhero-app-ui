import { useSuspenseQuery } from "@tanstack/react-query";

import { superheroByIdQueryOptions } from "../queries/superheroByIdQueryOptions";
import SuperheroForm from "../components/SuperheroForm";
import { Route } from "../../../routes/superheroes/$id/edit";

export default function SuperheroEditFormPage() {
  const { id } = Route.useParams();
  const { data: superhero } = useSuspenseQuery(
    superheroByIdQueryOptions(Number(id))
  );

  if (!superhero) return <div>Superhero not found</div>;
  return <SuperheroForm superhero={superhero} />;
}
