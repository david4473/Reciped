import { difficultyLevel } from "@/generated/prisma";

export interface Recipe {
  id: string;
  title: string;
  instructions: string;
  difficulty: difficultyLevel;
  cookTime: string;
  isPublic?: boolean;
  authorId?: number;
}
