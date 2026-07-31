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

export type VietnameseTrayHistory = {
  savory: string[];
  soup: string[];
  vegetable: string[];
};

export type VietnameseTrayShoppingItem = {
  group: "Gạo" | "Canh" | "Món mặn" | "Rau" | "Món kèm";
  item: string;
  amount: string;
  note: string;
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

const soups = [
  "Canh rau ngót thịt băm",
  "Canh bí xanh nấu tôm",
  "Canh cải xanh",
  "Canh chua cá",
  "Canh mướp mồng tơi",
  "Canh khoai tây cà rốt",
  "Canh cải chua",
  "Canh bầu nấu tôm",
  "Canh rau dền",
  "Canh bí đỏ",
  "Canh khổ qua nhồi thịt",
  "Canh rong biển đậu hũ",
  "Canh nấm",
  "Canh chua rau muống",
  "Canh cua rau đay",
  "Canh cải ngọt nấu thịt",
  "Canh thiên lý nấu tôm",
  "Canh cà chua trứng",
  "Canh hẹ đậu hũ",
  "Canh bắp cải cuộn thịt",
];

const savoryDishes = [
  "Thịt rang cháy cạnh",
  "Cá basa kho tộ",
  "Gà kho gừng",
  "Đậu hũ sốt cà",
  "Sườn rim mặn ngọt",
  "Bò xào hành cần",
  "Cá diêu hồng chiên",
  "Trứng chiên thịt băm",
  "Tôm rim mặn ngọt",
  "Thịt kho trứng",
  "Cá nục kho cà",
  "Gà xào sả ớt",
  "Cá thu sốt cà",
  "Thịt kho tiêu",
  "Đậu hũ kho nấm",
  "Cá rô kho nghệ",
  "Thịt băm chưng mắm tép",
  "Gà rim nước mắm",
  "Chả lá lốt",
  "Cá bạc má kho thơm",
  "Trứng cút kho thịt",
  "Tép rang khế",
  "Mực xào cần tỏi",
  "Cá trứng chiên giòn",
];

const vegetables = [
  "Rau muống xào tỏi",
  "Bắp cải luộc",
  "Giá hẹ xào",
  "Rau lang luộc",
  "Su su xào tỏi",
  "Đậu que luộc",
  "Đậu bắp luộc",
  "Cải thìa xào tỏi",
  "Rau muống luộc",
  "Cải thảo xào",
  "Rau cải luộc",
  "Đậu que xào tỏi",
  "Bông cải luộc",
  "Mướp xào giá",
  "Cải ngọt xào nấm",
  "Bí đỏ xào tỏi",
  "Cà tím nướng mỡ hành",
  "Bầu luộc",
  "Rau dền luộc",
  "Nấm xào cải thìa",
];

const sideDishes = [
  "Dưa leo",
  "Cà pháo",
  "Rau sống",
  "Dưa góp",
  "Trứng luộc",
  "Nước mắm gừng",
  "Cà chua",
  "Nước luộc rau vắt chanh",
  "Rau thơm",
  "Nước tương gừng",
  "Xoài xanh hoặc dưa leo",
  "Đậu phộng rang",
  "Kim chi hoặc dưa cải",
  "Muối mè",
];

const mealNotes = [
  "Ưu tiên rau mùa để dễ mua và đúng ngân sách.",
  "Món mặn nên nấu trước, rau làm sát giờ ăn.",
  "Có thể chừa một phần món kho cho hộp cơm hôm sau.",
  "Tách ớt riêng nếu nhà có người ăn ít cay.",
  "Bữa cân bằng, phù hợp nấu nhanh cho gia đình.",
  "Canh thanh và món mặn đậm vừa phải để ăn với cơm.",
  "Hạn chế chiên lại nhiều lần để món không bị khô.",
];

const hashSeed = (value: string) =>
  [...value].reduce((hash, character) => {
    const nextHash = (hash << 5) - hash + character.charCodeAt(0);
    return nextHash >>> 0;
  }, 2166136261);

const createSeededRandom = (seed: number) => {
  let value = seed || 1;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
};

const shuffled = <T,>(items: T[], random: () => number, blocked: string[] = []) => {
  const blockedSet = new Set(blocked);
  const preferred = items.filter((item) => !blockedSet.has(String(item)));
  const fallback = items.filter((item) => blockedSet.has(String(item)));
  return [...preferred, ...fallback].sort(() => random() - 0.5);
};

const budgetBandFor = (budgetPerPerson: number) => {
  if (budgetPerPerson < 30000) return "Tiết kiệm: ưu tiên trứng, đậu, cá nhỏ, rau mùa.";
  if (budgetPerPerson < 45000) return "Cân bằng: đủ cơm, canh, món mặn và rau.";
  if (budgetPerPerson < 65000) return "Khá thoải mái: thêm tôm, bò hoặc cá ngon 2-3 bữa.";
  return "Nâng cấp: có thể thêm trái cây, món phụ hoặc phần đạm tốt hơn.";
};

export const buildVietnameseTrayWeek = (
  seed = "default-week",
  previousHistory?: Partial<VietnameseTrayHistory>,
): VietnameseTrayDay[] => {
  const random = createSeededRandom(hashSeed(seed));
  const soupPlan = shuffled(soups, random, previousHistory?.soup).slice(0, 14);
  const savoryPlan = shuffled(savoryDishes, random, previousHistory?.savory).slice(0, 14);
  const vegetablePlan = shuffled(vegetables, random, previousHistory?.vegetable).slice(0, 14);
  const sidePlan = shuffled(sideDishes, random);
  const notePlan = shuffled(mealNotes, random);

  const buildMeal = (index: number, session: VietnameseMealSession): VietnameseTrayMeal => ({
    session,
    rice: "Cơm trắng",
    soup: soupPlan[index],
    savory: savoryPlan[index],
    vegetable: vegetablePlan[index],
    boiled: sidePlan[index % sidePlan.length],
    note: notePlan[index % notePlan.length],
  });

  return plannerDays.map((day, index) => ({
    day,
    lunch: buildMeal(index * 2, "Bữa trưa"),
    dinner: buildMeal(index * 2 + 1, "Bữa chiều"),
  }));
};

export const summarizeVietnameseTrayHistory = (
  week: VietnameseTrayDay[],
): VietnameseTrayHistory => {
  const meals = week.flatMap((day) => [day.lunch, day.dinner]);
  return {
    soup: meals.map((meal) => meal.soup),
    savory: meals.map((meal) => meal.savory),
    vegetable: meals.map((meal) => meal.vegetable),
  };
};

const amountForGroup = (
  group: VietnameseTrayShoppingItem["group"],
  diners: number,
) => {
  if (group === "Gạo") return `${diners * 160} g`;
  if (group === "Canh") return `2 phần canh cho ${diners} người`;
  if (group === "Món mặn") return `2 món mặn cho ${diners} người`;
  if (group === "Rau") return `2 phần rau cho ${diners} người`;
  return `2 phần dùng kèm cho ${diners} người`;
};

export const buildVietnameseTrayShoppingList = (
  day: VietnameseTrayDay,
  diners: number,
): VietnameseTrayShoppingItem[] => {
  const meals = [day.lunch, day.dinner];
  const itemMap = new Map<string, VietnameseTrayShoppingItem>();

  const addItem = (
    group: VietnameseTrayShoppingItem["group"],
    item: string,
    note: string,
  ) => {
    const key = `${group}|${item.toLocaleLowerCase("vi")}`;
    if (itemMap.has(key)) return;
    itemMap.set(key, {
      group,
      item,
      amount: amountForGroup(group, diners),
      note,
    });
  };

  addItem("Gạo", "Gạo tẻ nấu cơm", "Tính cho cả bữa trưa và bữa chiều.");
  meals.forEach((meal) => {
    addItem("Canh", meal.soup, `${meal.session}: nguyên liệu chính cho món canh.`);
    addItem("Món mặn", meal.savory, `${meal.session}: chuẩn bị đạm và gia vị kho/rim/xào.`);
    addItem("Rau", meal.vegetable, `${meal.session}: mua rau tươi, làm sát giờ ăn.`);
    if (meal.boiled) {
      addItem("Món kèm", meal.boiled, `${meal.session}: món ăn kèm cân vị mâm cơm.`);
    }
  });

  const groupOrder: VietnameseTrayShoppingItem["group"][] = [
    "Gạo",
    "Canh",
    "Món mặn",
    "Rau",
    "Món kèm",
  ];
  return [...itemMap.values()].sort(
    (a, b) => groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group),
  );
};

export const estimateMealBudget = (diners: number, budgetPerPerson: number) => ({
  perMeal: diners * budgetPerPerson,
  perDay: diners * budgetPerPerson * 2,
  perWeek: diners * budgetPerPerson * 14,
  guidance: budgetBandFor(budgetPerPerson),
});
