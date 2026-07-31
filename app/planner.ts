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

export type VietnameseMealSession = "Bữa trưa" | "Bữa chiều";

export type VietnameseTrayMeal = {
  session: VietnameseMealSession;
  rice: string;
  soup: string;
  savory: string;
  vegetable: string;
  boiled?: string;
  note: string;
};

export type VietnameseTrayDay = {
  day: PlannerDay;
  lunch: VietnameseTrayMeal;
  dinner: VietnameseTrayMeal;
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

const lunchMeals: Omit<VietnameseTrayMeal, "session">[] = [
  { rice: "Cơm trắng", soup: "Canh rau ngót thịt băm", savory: "Thịt rang cháy cạnh", vegetable: "Rau muống xào tỏi", boiled: "Dưa leo", note: "Bữa quen vị Bắc, dễ nấu số lượng lớn." },
  { rice: "Cơm trắng", soup: "Canh bí xanh nấu tôm", savory: "Cá basa kho tộ", vegetable: "Bắp cải luộc", boiled: "Cà pháo", note: "Kho cá trước, rau làm sát giờ ăn." },
  { rice: "Cơm trắng", soup: "Canh cải xanh", savory: "Gà kho gừng", vegetable: "Giá hẹ xào", boiled: "Dưa leo", note: "Gà ướp 20-30 phút cho thấm." },
  { rice: "Cơm trắng", soup: "Canh chua cá", savory: "Đậu hũ sốt cà", vegetable: "Rau lang luộc", boiled: "Rau sống", note: "Phù hợp ngày muốn giảm thịt đỏ." },
  { rice: "Cơm trắng", soup: "Canh mướp mồng tơi", savory: "Sườn rim mặn ngọt", vegetable: "Su su xào tỏi", boiled: "Kim chi hoặc dưa góp", note: "Sườn chần trước để món trong và thơm." },
  { rice: "Cơm trắng", soup: "Canh khoai tây cà rốt", savory: "Bò xào hành cần", vegetable: "Đậu que luộc", boiled: "Trứng luộc", note: "Bò chỉ xào nhanh để mềm." },
  { rice: "Cơm trắng", soup: "Canh cải chua", savory: "Cá diêu hồng chiên", vegetable: "Đậu bắp luộc", boiled: "Nước mắm gừng", note: "Cá lau thật khô trước khi chiên." },
];

const dinnerMeals: Omit<VietnameseTrayMeal, "session">[] = [
  { rice: "Cơm trắng", soup: "Canh bầu nấu tôm", savory: "Trứng chiên thịt băm", vegetable: "Cải thìa xào tỏi", boiled: "Cà chua", note: "Bữa chiều nhẹ, tận dụng thịt băm." },
  { rice: "Cơm trắng", soup: "Canh rau dền", savory: "Tôm rim mặn ngọt", vegetable: "Rau muống luộc", boiled: "Nước luộc rau vắt chanh", note: "Tôm rim vừa lửa để không khô." },
  { rice: "Cơm trắng", soup: "Canh bí đỏ", savory: "Thịt kho trứng", vegetable: "Cải thảo xào", boiled: "Dưa leo", note: "Kho dư một phần nhỏ cho hộp cơm hôm sau." },
  { rice: "Cơm trắng", soup: "Canh khổ qua nhồi thịt", savory: "Cá nục kho cà", vegetable: "Rau cải luộc", boiled: "Rau thơm", note: "Cân vị mặn vì cá kho đã đậm." },
  { rice: "Cơm trắng", soup: "Canh rong biển đậu hũ", savory: "Gà xào sả ớt", vegetable: "Đậu que xào tỏi", boiled: "Dưa góp", note: "Tách ớt riêng nếu có người ăn ít cay." },
  { rice: "Cơm trắng", soup: "Canh nấm", savory: "Cá thu sốt cà", vegetable: "Bông cải luộc", boiled: "Nước tương gừng", note: "Sốt cà nấu trước, cá cho vào sau." },
  { rice: "Cơm trắng", soup: "Canh chua rau muống", savory: "Thịt kho tiêu", vegetable: "Mướp xào giá", boiled: "Xoài xanh hoặc dưa leo", note: "Bữa cuối tuần gọn, ít món chiên." },
];

const budgetBandFor = (budgetPerPerson: number) => {
  if (budgetPerPerson < 30000) return "Tiết kiệm: ưu tiên trứng, đậu, cá nhỏ, rau mùa.";
  if (budgetPerPerson < 45000) return "Cân bằng: đủ cơm, canh, món mặn và rau.";
  if (budgetPerPerson < 65000) return "Khá thoải mái: thêm tôm, bò hoặc cá ngon 2-3 bữa.";
  return "Nâng cấp: có thể thêm trái cây, món phụ hoặc phần đạm tốt hơn.";
};

export const buildVietnameseTrayWeek = (): VietnameseTrayDay[] =>
  plannerDays.map((day, index) => ({
    day,
    lunch: { session: "Bữa trưa", ...lunchMeals[index] },
    dinner: { session: "Bữa chiều", ...dinnerMeals[index] },
  }));

export const estimateMealBudget = (diners: number, budgetPerPerson: number) => ({
  perMeal: diners * budgetPerPerson,
  perDay: diners * budgetPerPerson * 2,
  perWeek: diners * budgetPerPerson * 14,
  guidance: budgetBandFor(budgetPerPerson),
});
