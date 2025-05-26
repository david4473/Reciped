export const getIngredientName = (ingredient: string) => {
  const cleaned = ingredient
    .replace(/^\d+[\s\w]*\s+/, "")
    .split(",")[0]
    .split("(")[0]
    .trim();

  return cleaned.length > 15 ? cleaned.substring(0, 15) + "..." : cleaned;
};
