import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipe/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/recipe/edit/"!</div>
}
