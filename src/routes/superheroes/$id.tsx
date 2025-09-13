import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/superheroes/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/superheroes/$id"!</div>
}
