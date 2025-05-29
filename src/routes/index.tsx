import { createFileRoute, redirect } from "@tanstack/react-router";
import authClient from "@/lib/auth-client";
import { getUserID } from "@/lib/auth-server";
import { getRecipes } from "@/utils/serverActions/recipes";
import RecipeCard from "@/components/recipe-card";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const userID = await getUserID();
    return {
      userID,
    };
  },
  loader: async () => {
    const recipes = await getRecipes();
    if (!recipes) {
      throw new Error("Failed to fetch recipes");
    }
    return recipes;
  },
});

function Home() {
  const recipes = Route.useLoaderData();

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Featured Recipes</h1>
          <p className="text-muted-foreground">
            Discover delicious recipes from our community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
