import { difficultyLevel, Prisma, PrismaClient } from "~/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding users...");
  const now = new Date();

  const user1 = await prisma.user.create({
    data: {
      email: "chef.anna@example.com",
      name: "Chef Anna",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "baker.ben@example.com",
      name: "Baker Ben",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "test.user@example.com",
      name: "Test User",
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
      instructions:
        "Heat oil, add chopped vegetables (broccoli, carrots, bell peppers), stir-fry for 5-7 minutes until tender-crisp. Add soy sauce and ginger. Serve immediately.",
      difficulty: difficultyLevel.EASY,
      cookTime: 15, // 15 minutes
      isPublic: true,
      authorId: user1.id,
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      title: "Homemade Sourdough Bread",
      instructions:
        "Day 1: Feed starter, mix dough, bulk ferment. Day 2: Shape, cold proof, bake in Dutch oven.",
      difficulty: difficultyLevel.HARD,
      cookTime: 50, // 50 minutes bake time + many hours of fermentation
      isPublic: true,
      authorId: user2.id,
    },
  });

  const recipe3 = await prisma.recipe.create({
    data: {
      title: "Creamy Mushroom Risotto",
      instructions:
        "Sauté onions and mushrooms. Add Arborio rice, deglaze with white wine. Gradually add hot broth, stirring constantly until creamy and al dente. Stir in Parmesan and butter.",
      difficulty: difficultyLevel.MEDIUM,
      cookTime: 30, // 30 minutes
      isPublic: true,
      authorId: user1.id,
    },
  });

  const recipe4 = await prisma.recipe.create({
    data: {
      title: "Banana Pancakes",
      instructions:
        "Mash bananas, mix with flour, egg, milk, and baking powder. Cook on a griddle until golden brown on both sides.",
      difficulty: difficultyLevel.EASY,
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
