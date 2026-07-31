import { Recipe } from "./recipes";

export const plannerDays = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
] as const;

export type PlannerDay = (typeof plannerDays)[number];

export type PlannerSlot = {
  day: PlannerDay;
  recipeId: number | null;
  servings: number;
};

export type ShoppingItem = {
  key: string;
  item: string;
  amount: number | string;
  unit: string;
  group: "Phần chính" | "Gia vị" | "Ăn kèm";
  recipes: string[];
};

export const createEmptyPlanner = (): PlannerSlot[] =>
  plannerDays.map((day) => ({ day, recipeId: null, servings: 4 }));

const roundAmount = (value: number) => {
  if (value < 10) return Number(value.toFixed(1));
  return Math.round(value);
};

export const buildShoppingList = (
  planner: PlannerSlot[],
  allRecipes: Recipe[],
): ShoppingItem[] => {
  const recipeMap = new Map(allRecipes.map((recipe) => [recipe.id, recipe]));
  const aggregated = new Map<string, ShoppingItem>();

  planner.forEach((slot) => {
    if (slot.recipeId === null) return;
    const recipe = recipeMap.get(slot.recipeId);
    if (!recipe) return;

    recipe.ingredients.forEach((ingredient) => {
      const key = `${ingredient.group}|${ingredient.item.toLocaleLowerCase("vi")}|${ingredient.unit.toLocaleLowerCase("vi")}`;
      const scaled =
        typeof ingredient.amount === "number"
          ? ingredient.amount * (slot.servings / recipe.servings)
          : ingredient.amount;
      const existing = aggregated.get(key);

      if (!existing) {
        aggregated.set(key, {
          key,
          item: ingredient.item,
          amount: typeof scaled === "number" ? roundAmount(scaled) : scaled,
          unit: ingredient.unit,
          group: ingredient.group,
          recipes: [recipe.name],
        });
        return;
      }

      if (typeof existing.amount === "number" && typeof scaled === "number") {
        existing.amount = roundAmount(existing.amount + scaled);
      } else if (!String(existing.amount).includes(String(scaled))) {
        existing.amount = `${existing.amount} + ${scaled}`;
      }
      if (!existing.recipes.includes(recipe.name)) existing.recipes.push(recipe.name);
    });
  });

  const groupOrder: ShoppingItem["group"][] = ["Phần chính", "Gia vị", "Ăn kèm"];
  return [...aggregated.values()].sort((a, b) => {
    const groupDifference =
      groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    return groupDifference || a.item.localeCompare(b.item, "vi");
  });
};

export const samplePlannerNames = [
  "Cơm thịt rang cháy cạnh",
  "Cơm cá basa kho tộ",
  "Cơm gà kho gừng",
  "Cơm đậu hũ sốt cà",
  "Cơm sườn ram mặn",
  "Cơm bò xào hành cần",
  "Cơm cá diêu hồng chiên",
];

export const createSamplePlanner = (allRecipes: Recipe[]): PlannerSlot[] => {
  const byName = new Map(allRecipes.map((recipe) => [recipe.name, recipe.id]));
  return plannerDays.map((day, index) => ({
    day,
    recipeId: byName.get(samplePlannerNames[index]) ?? null,
    servings: 4,
  }));
};
