import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { superheroByIdQueryOptions } from "../../../features/superhero/queries/superheroByIdQueryOptions";
import SuperheroEditFormPage from "../../../features/superhero/pages/SuperheroEditFormPage";

export const Route = createFileRoute("/superheroes/$id/edit")({
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(superheroByIdQueryOptions(Number(id)));
  },
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  component: RouteComponent,
});

function RouteComponent() {
  return <SuperheroEditFormPage />;
}
