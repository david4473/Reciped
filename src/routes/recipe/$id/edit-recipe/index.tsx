import type React from "react";

import { useState } from "react";

import { ArrowLeft, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getUserID } from "@/lib/auth-server";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { getRecipeById, updateRecipe } from "@/api/recipes";
import { useFormField } from "@/hooks/useFormField";

export const Route = createFileRoute("/recipe/$id/edit-recipe/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const userID = await getUserID();
    return {
      userID,
    };
  },
  loader: async ({ params, context: ctx }) => {
    // Ensure the user is authenticated
    if (!ctx.userID) {
      throw redirect({ to: "/" });
    }

    // Validate that the recipe ID is provided
    const { id } = params;
    if (!id) {
      throw new Error("Recipe ID is required");
    }

    const recipe = await getRecipeById({
      data: id,
    });

    return { id, recipe };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { id, recipe } = Route.useLoaderData();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ...recipe,
  });

  const [ingredients, setIngredients] = useState<string[]>([
    ...recipe.ingredients,
  ]);
  const [steps, setSteps] = useState<string[]>([...recipe.steps]);

  const {
    addIngredient,
    removeIngredient,
    updateIngredient,
    addStep,
    removeStep,
    updateStep,
  } = useFormField(setIngredients, setSteps, steps, ingredients);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await updateRecipe({
        data: {
          ...formData,
          ingredients: ingredients.filter((i) => i.trim()),
          steps: steps.filter((s) => s.trim()),
        },
      });

      navigate({ to: `/recipe/${id}` });
    } catch (error) {
      console.error("Failed to create recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.difficulty &&
    formData.cookTime &&
    ingredients.some((i) => i.trim()) &&
    steps.some((s) => s.trim());

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/recipe/$id" params={{ id }}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {recipe.title?.slice(0, 15)}
              </Link>
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Edit Recipe</h1>
            <p className="text-muted-foreground">
              Update the "<i>{recipe.title}</i>" recipe details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Recipe Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter recipe title..."
                    value={formData.title ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={
                        formData.difficulty?.toLocaleLowerCase() ?? "Medium"
                      }
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          difficulty: value as typeof formData.difficulty,
                        })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cookTime">Cook Time</Label>
                    <Input
                      id="cookTime"
                      placeholder="e.g., 30 min"
                      value={formData.cookTime ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cookTime: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overview">Quick overview</Label>
                  <Textarea
                    id="overview"
                    placeholder="Brief overview of the recipe..."
                    value={formData.overview ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, overview: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ingredients</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Ingredient ${index + 1}...`}
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1"
                    />
                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Steps */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>overview</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStep}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <Badge variant="outline" className="mt-2 flex-shrink-0">
                      {index + 1}
                    </Badge>
                    <Textarea
                      placeholder={`Step ${index + 1}...`}
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    {steps.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStep(index)}
                        className="mt-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1 md:flex-none"
              >
                {isSubmitting ? "Updating Recipe..." : "Update Recipe"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
