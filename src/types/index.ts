export enum difficultyLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export type Recipe = {
  id: string;
  title: string | null;
  createdAt: Date;
  overview: string | null;
  ingredients: string[];
  steps: string[];
  difficulty: difficultyLevel | null;
  cookTime: number | null;
  isPublic: boolean;
  authorId: string;
};
