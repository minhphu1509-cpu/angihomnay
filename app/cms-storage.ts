import type { Recipe } from "./recipes";

export const CMS_DRAFTS_KEY = "an-gi-hom-nay-cms-drafts-v1";
export const CMS_PUBLISHED_KEY = "an-gi-hom-nay-cms-published-v1";

export type RecipeRecordMap = Record<string, Recipe>;

const isRecipe = (value: unknown): value is Recipe => {
  if (!value || typeof value !== "object") return false;
  const recipe = value as Partial<Recipe>;
  return (
    typeof recipe.id === "number" &&
    typeof recipe.name === "string" &&
    typeof recipe.description === "string" &&
    Array.isArray(recipe.ingredients) &&
    Array.isArray(recipe.steps) &&
    typeof recipe.verificationStatus === "string" &&
    typeof recipe.imageStatus === "string"
  );
};

export const parseRecipeRecordMap = (value: string | null): RecipeRecordMap => {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([key, recipe]) => /^\d+$/.test(key) && isRecipe(recipe),
      ),
    );
  } catch {
    return {};
  }
};

export const mergeRecipeRecords = (
  baseRecipes: Recipe[],
  records: RecipeRecordMap,
) =>
  baseRecipes.map((recipe) => {
    const saved = records[String(recipe.id)];
    return saved && saved.id === recipe.id ? saved : recipe;
  });

export const cloneRecipe = (recipe: Recipe): Recipe =>
  JSON.parse(JSON.stringify(recipe)) as Recipe;

export const validateRecipe = (recipe: Recipe) => {
  const issues: string[] = [];
  if (!recipe.name.trim()) issues.push("Thiếu tên món");
  if (!recipe.description.trim()) issues.push("Thiếu mô tả");
  if (recipe.ingredients.length < 6) issues.push("Cần ít nhất 6 nguyên liệu");
  if (recipe.steps.length < 4) issues.push("Cần ít nhất 4 bước");
  if (!recipe.doneness.trim()) issues.push("Thiếu dấu hiệu món đạt");
  if (!recipe.safety.trim()) issues.push("Thiếu lưu ý an toàn");
  if (!recipe.storage.trim()) issues.push("Thiếu hướng dẫn bảo quản");
  if (!recipe.sourceNote.trim()) issues.push("Thiếu ghi chú nguồn");
  if (recipe.imageStatus === "Ảnh đúng món" && !recipe.image) {
    issues.push("Ảnh được gắn nhãn đúng món nhưng chưa có tệp ảnh");
  }
  return issues;
};
