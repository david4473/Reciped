import { PrismaClient } from "@/generated/prisma";
import { createServerFn, json } from "@tanstack/react-start";

const prisma = new PrismaClient();

const readRecipes = async () => {};

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
