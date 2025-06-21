import { Plus, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

import RecipeCard from "@/components/RecipeCard";
import authClient from "@/lib/auth-client";
import { getAuthorRecipes } from "@/api/recipes";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getUserID } from "@/lib/auth-server";
import { use } from "react";

export const Route = createFileRoute("/my-recipes/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const userID = await getUserID();
    return {
      userID,
    };
  },
  loader: async ({ context: ctx }) => {
    if (!ctx.userID) {
      throw redirect({ to: "/" });
    }

    const recipes = await getAuthorRecipes({ data: ctx.userID });
    return { recipes };
  },
});

function RouteComponent() {
  const { recipes } = Route.useLoaderData();

  const publicRecipes = recipes.filter((recipe) => recipe.isPublic).length;
  const privateRecipes = recipes.filter((recipe) => !recipe.isPublic).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <main className="flex-1 container py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Recipes</h1>
                <p className="text-muted-foreground">
                  Your personal recipe collection
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mb-6">
              <div className="bg-white rounded-lg border p-4 flex-1">
                <div className="text-2xl font-bold text-primary">
                  {recipes.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Recipes
                </div>
              </div>
              <div className="bg-white rounded-lg border p-4 flex-1">
                <div className="text-2xl font-bold text-green-600">
                  {publicRecipes}
                </div>
                <div className="text-sm text-muted-foreground">Public</div>
              </div>
              <div className="bg-white rounded-lg border p-4 flex-1">
                <div className="text-2xl font-bold text-orange-600">
                  {privateRecipes}
                </div>
                <div className="text-sm text-muted-foreground">Private</div>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <ChefHat className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start building your recipe collection by creating your first
                recipe.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
