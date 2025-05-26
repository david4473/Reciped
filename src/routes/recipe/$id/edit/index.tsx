import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipe/$id/edit/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { id } = params;
    if (!id) {
      throw new Error("Recipe ID is required");
    }
    // Simulate fetching recipe data
    return id;
  },
});

function RouteComponent() {
  const id = Route.useLoaderData();
  return <div>Hello "/recipe/edit/{id}"!</div>;
}
