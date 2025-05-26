import { PrismaClient } from "@/generated/prisma";
import { createServerFn, json } from "@tanstack/react-start";

const prisma = new PrismaClient();

const readRecipes = async () => {};

export const getRecipes = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching recipes...");
    const recipes = await prisma.recipe.findMany({
      where: { isPublic: true },
    });
    if (!recipes) {
      throw new Error("Failed to fetch recipes");
    }
    return recipes;
  }
);
