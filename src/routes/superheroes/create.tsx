import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/superheroes/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/superheroes/create"!</div>
}
