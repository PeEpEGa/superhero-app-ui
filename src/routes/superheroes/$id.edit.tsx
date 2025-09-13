import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/superheroes/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/superheroes/$id/edit"!</div>
}
