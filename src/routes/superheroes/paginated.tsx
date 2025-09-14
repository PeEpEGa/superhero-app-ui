import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { superheroQueryOptions } from "../../features/superhero/queries/superheroQueryOptions";
import SuperheroListPage from "../../features/superhero/pages/SuperheroListPage";

type SuperheroSearch = { page: number; limit: number };

export const Route = createFileRoute("/superheroes/paginated")({
  validateSearch: (search: Record<string, unknown>): SuperheroSearch => ({
    page: Number(search?.page || 1),
    limit: Number(search?.limit || 5),
  }),
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context: { queryClient }, deps: { page, limit } }) => {
    return queryClient.ensureQueryData(superheroQueryOptions(page, limit));
  },
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  component: RouteComponent,
});

function RouteComponent() {
  return <SuperheroListPage />;
}
