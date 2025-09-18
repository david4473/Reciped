import { PrismaClient, Recipe } from "@/generated/prisma/index.js";
import { getUserID } from "@/lib/auth-server";
import { createServerFn, json } from "@tanstack/react-start";
import { RecipeInput } from "../types";

const prisma = new PrismaClient();

export const getRecipes = createServerFn({ method: "GET" }).handler(
  async () => {
    const recipes = await prisma.recipe.findMany({
      where: { isPublic: true },
    });
    if (!recipes) {
      throw new Error("Failed to fetch recipes");
    }
    return recipes;
  }
);

export const getRecipeById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    const recipe = await prisma.recipe.findUnique({
      where: { id: data },
      include: {
        author: true,
      },
    });
    if (!recipe) {
      throw new Error(`Recipe with ID ${data} not found`);
    }
    return recipe;
  });

export const getAuthorRecipes = createServerFn({ method: "GET" })
  .validator((authorId: string) => authorId)
  .handler(async ({ data }) => {
    const recipes = await prisma.recipe.findMany({
      where: { authorId: data },
      include: { author: true },
    });

    if (!recipes) {
      throw new Error(`No recipes found for author with ID ${data}`);
    }

    return recipes;
  });

export const createRecipe = createServerFn({ method: "POST" })
  .validator((data: RecipeInput) => data)
  .handler(async ({ data }) => {
    // Ensure the user is authenticated and has an author ID
    const authorId = await getUserID();
    if (!authorId) {
      throw new Error("Author ID is required to create a recipe");
    }

    try {
      const { title, overview, ingredients, steps, difficulty, cookTime } =
        data;
      const newRecipe = await prisma.recipe.create({
        data: {
          title,
          overview,
          ingredients,
          steps,
          difficulty,
          cookTime,
          authorId: authorId,
        },
      });
      if (!newRecipe) {
        throw new Error("Failed to create recipe");
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw new Error("Failed to create recipe");
    }
  });

export const updateRecipe = createServerFn({ method: "POST" })
  .validator((data: Recipe) => data)
  .handler(async ({ data }) => {
    try {
      const {
        id,
        title,
        overview,
        ingredients,
        steps,
        difficulty,
        cookTime,
        isPublic,
      } = data;
      const updatedRecipe = await prisma.recipe.update({
        where: { id },
        data: {
          title,
          overview,
          ingredients,
          steps,
          difficulty,
          cookTime,
          isPublic,
        },
      });
      if (!updatedRecipe) {
        throw new Error(`Failed to update recipe with ID ${id}`);
      }
      return updatedRecipe;
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw new Error("Failed to update recipe");
    }
  });
