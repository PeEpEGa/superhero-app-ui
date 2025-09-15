import { createFileRoute } from "@tanstack/react-router";
import SuperheroAddFormPage from "../../features/superhero/pages/SuperheroAddFormPage";

export const Route = createFileRoute("/superheroes/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SuperheroAddFormPage />;
}
