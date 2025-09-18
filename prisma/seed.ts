import {
  difficultyLevel,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding users...");
  const now = new Date();

  const user1 = await prisma.user.create({
    data: {
      email: "anna@example.com",
      name: "Anna",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "ben@example.com",
      name: "Baker",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "UserT",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  // --- 2. Seed Recipes ---
  console.log("Seeding recipes...");

  const recipe1 = await prisma.recipe.create({
    data: {
      title: "Quick Veggie Stir-fry",
      overview:
        "Heat oil, add chopped vegetables (broccoli, carrots, bell peppers), stir-fry for 5-7 minutes until tender-crisp. Add soy sauce and ginger. Serve immediately.",
      difficulty: difficultyLevel.EASY,
      ingredients: [
        "2 cups all-purpose flour",
        "3 large eggs",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "28 oz crushed tomatoes",
        "Fresh basil leaves",
        "1 tsp oregano",
        "Salt and pepper to taste",
      ],
      steps: [
        "Heat 2 tbsp olive oil in a large skillet over medium-high heat.",
        "Add 3 cloves minced garlic and sauté for 30 seconds until fragrant.",
        "Add 2 cups chopped mixed vegetables (broccoli, carrots, bell peppers) to the skillet.",
        "Stir-fry for 5-7 minutes until vegetables are tender-crisp.",
        "Add 2 tbsp soy sauce and 1 tsp grated ginger. Stir well to combine.",
        "Cook for another minute, then remove from heat.",
        "Serve immediately over cooked rice or noodles.",
      ],
      cookTime: 15, // 15 minutes
      isPublic: true,
      authorId: user1.id,
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      title: "Homemade Sourdough Bread",
      overview:
        "Day 1: Feed starter, mix dough, bulk ferment. Day 2: Shape, cold proof, bake in Dutch oven.",
      difficulty: difficultyLevel.HARD,
      ingredients: [
        "2 slices whole grain bread",
        "1 ripe avocado",
        "1 lime, juiced",
        "Cherry tomatoes, halved",
        "Red pepper flakes",
        "Extra virgin olive oil",
        "Salt and pepper to taste",
      ],
      steps: [
        "Feed your sourdough starter 8-12 hours before starting.",
        "Mix 500g bread flour, 350g water, and 100g active starter in a bowl.",
        "Autolyse for 30 minutes, then add 10g salt and mix well.",
        "Bulk ferment for 4-6 hours, folding every 30 minutes.",
        "Shape the dough and place it in a floured banneton.",
        "Cold proof in the fridge overnight (12-14 hours).",
        "Preheat oven to 450°F (230°C) with a Dutch oven inside.",
        "Bake for 30 minutes covered, then 20 minutes uncovered until golden brown.",
      ],
      cookTime: 50, // 50 minutes bake time + many hours of fermentation
      isPublic: true,
      authorId: user2.id,
    },
  });

  const recipe3 = await prisma.recipe.create({
    data: {
      title: "Creamy Mushroom Risotto",
      overview:
        "Sauté onions and mushrooms. Add Arborio rice, deglaze with white wine. Gradually add hot broth, stirring constantly until creamy and al dente. Stir in Parmesan and butter.",
      difficulty: difficultyLevel.MEDIUM,
      ingredients: [
        "6 cups vegetable broth",
        "8 oz mixed mushrooms, sliced",
        "1 medium onion, diced",
        "1½ cups arborio rice",
        "½ cup white wine",
        "½ cup grated parmesan",
        "2 tbsp butter",
        "Salt and pepper to taste",
      ],
      steps: [
        "Heat broth in a saucepan and keep warm.",
        "In a separate pan, sauté onions in olive oil until translucent.",
        "Add mushrooms and cook until browned.",
        "Stir in Arborio rice and toast for 1-2 minutes.",
        "Deglaze with white wine, stirring until absorbed.",
        "Gradually add warm broth, one ladle at a time, stirring constantly.",
        "Cook until rice is al dente and creamy, about 18-20 minutes.",
        "Stir in Parmesan cheese and butter. Season with salt and pepper to taste.",
      ],
      cookTime: 30, // 30 minutes
      isPublic: true,
      authorId: user1.id,
    },
  });

  const recipe4 = await prisma.recipe.create({
    data: {
      title: "Banana Pancakes",
      overview:
        "Mash bananas, mix with flour, egg, milk, and baking powder. Cook on a griddle until golden brown on both sides.",
      difficulty: difficultyLevel.EASY,
      ingredients: [
        "2 lbs beef tenderloin",
        "8 oz pâté",
        "8 slices prosciutto",
        "1 sheet puff pastry",
        "2 egg yolks",
        "Salt and pepper to taste",
        "2 tbsp olive oil",
      ],
      steps: [
        "Wash lettuce",
        "Chop vegetables",
        "Mix dressing",
        "Toss salad",
        "Serve chilled",
        "Garnish with fresh herbs",
        "Drizzle a bit of lemon juice just before serving",
      ],
      cookTime: 10, // 10 minutes
      isPublic: true,
      authorId: user3.id,
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
