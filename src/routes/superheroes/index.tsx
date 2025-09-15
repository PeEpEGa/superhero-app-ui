import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/superheroes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/superheroes/"!</div>;
}
