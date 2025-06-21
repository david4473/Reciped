import { createFileRoute } from '@tanstack/react-router'

<<<<<<< HEAD
export const APIRoute = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
  POST: ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
});
=======
export const Route = createFileRoute('/api/auth/$')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/auth/$"!</div>
}
>>>>>>> restore-working-state
