import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { superheroByIdQueryOptions } from "../../../features/superhero/queries/superheroByIdQueryOptions";
import SuperheroDetailPage from "../../../features/superhero/pages/SuperheroDetailPage";

export const Route = createFileRoute("/superheroes/$id/")({
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(superheroByIdQueryOptions(Number(id)));
  },
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  component: RouteComponent,
});

function RouteComponent() {
  return <SuperheroDetailPage />;
}
