import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Trash2,
  ArrowLeft,
  Clock,
  Edit,
  Lock,
  MoreVertical,
} from "lucide-react";
import { difficultyConfig } from "@/utils/config";
import { getRecipeById } from "@/utils/serverActions/recipes";
import authClient from "@/lib/auth-client";

export const Route = createFileRoute("/recipe/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { id } = params;
    const recipe = getRecipeById({
      data: id,
    });
    return recipe;
  },
});

function RouteComponent() {
  const recipe = Route.useLoaderData();

  const { data: session } = authClient.useSession();
  const isAuthor = session?.user.id === recipe.authorId;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Recipes
              </Link>
            </Button>
          </div>

          {/* Recipe Header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge
                  variant="outline"
                  className={
                    recipe.difficulty
                      ? difficultyConfig[recipe.difficulty].color
                      : ""
                  }
                >
                  {recipe.difficulty
                    ? difficultyConfig[recipe.difficulty].label
                    : ""}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cookTime}</span>
                </div>
                {isAuthor && !recipe.isPublic && (
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-600"
                  >
                    <Lock className="mr-1 h-3 w-3" />
                    Private
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Created by {recipe.author.name} on{" "}
                {new Date(recipe.createdAt).toLocaleDateString()}
              </p>
            </div>

            {isAuthor && (
              <div className="flex items-center gap-2">
                <Button asChild>
                  <Link to="/recipe/$id/edit" params={{ id: recipe.id }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Recipe
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Lock className="mr-2 h-4 w-4" />
                      {recipe.isPublic ? "Make Public" : "Make Private"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Recipe
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.ingredients?.map((ingredient, index) => (
                      <li
                        key={index}
                        className="text-sm flex items-start gap-2"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {recipe.steps?.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
