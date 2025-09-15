import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  navigate({ to: "/superheroes/paginated", search: { page: 1, limit: 5 } });
  return <div>Hello "/"!</div>;
}
