import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipe/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { id } = params;
    return id;
  },
});

function RouteComponent() {
  const recipeID = Route.useLoaderData();
  return <div>Hello "/recipes/{recipeID}"!</div>;
}
