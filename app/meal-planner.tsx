"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Recipe } from "./recipes";
import {
  PlannerSlot,
  ShoppingItem,
  buildVietnameseTrayWeek,
  estimateMealBudget,
} from "./planner";

type MealPlannerProps = {
  planner: PlannerSlot[];
  recipes: Recipe[];
  shoppingItems: ShoppingItem[];
  checkedShoppingItems: string[];
  onSetRecipe: (index: number, recipeId: number | null) => void;
  onChangeServings: (index: number, delta: number) => void;
  onLoadSample: () => void;
  onClear: () => void;
  onToggleShoppingItem: (key: string) => void;
  onClearCheckedShoppingItems: () => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onNotice: (message: string) => void;
};

const formatAmount = (amount: number | string) =>
  typeof amount === "number"
    ? amount.toLocaleString("vi-VN", { maximumFractionDigits: 1 })
    : amount;

const formatMoney = (value: number) =>
  `${Math.round(value).toLocaleString("vi-VN")}đ`;

export default function MealPlanner({
  planner,
  recipes,
  shoppingItems,
  checkedShoppingItems,
  onSetRecipe,
  onChangeServings,
  onLoadSample,
  onClear,
  onToggleShoppingItem,
  onClearCheckedShoppingItems,
  onOpenRecipe,
  onNotice,
}: MealPlannerProps) {
  const [trayDiners, setTrayDiners] = useState(4);
  const [budgetPerPerson, setBudgetPerPerson] = useState(30000);
  const vietnameseTrayWeek = useMemo(() => buildVietnameseTrayWeek(), []);
  const mealBudget = useMemo(
    () => estimateMealBudget(trayDiners, budgetPerPerson),
    [trayDiners, budgetPerPerson],
  );
  const recipeMap = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const plannedCount = planner.filter((slot) => slot.recipeId !== null).length;
  const checkedCount = shoppingItems.filter((item) =>
    checkedShoppingItems.includes(item.key),
  ).length;
  const groupedShoppingItems = (
    ["Phần chính", "Gia vị", "Ăn kèm"] as const
  ).map((group) => ({
    group,
    items: shoppingItems.filter((item) => item.group === group),
  }));

  const copyShoppingList = async () => {
    if (!shoppingItems.length) {
      onNotice("Hãy thêm món vào thực đơn trước khi tạo danh sách.");
      return;
    }
    const lines = [
      "DANH SÁCH ĐI CHỢ · ĂN GÌ HÔM NAY",
      ...groupedShoppingItems.flatMap(({ group, items }) => [
        `\n${group.toLocaleUpperCase("vi")}`,
        ...items.map(
          (item) =>
            `${checkedShoppingItems.includes(item.key) ? "✓" : "□"} ${formatAmount(item.amount)} ${item.unit} ${item.item}`,
        ),
      ]),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      onNotice("Đã sao chép danh sách đi chợ.");
    } catch {
      onNotice("Trình duyệt chưa cho phép sao chép tự động.");
    }
  };

  return (
    <section className="planner-section" id="ke-hoach-tuan">
      <div className="planner-heading">
        <div>
          <p className="section-kicker">Bếp tuần này</p>
          <h2>Lên món một lần,<br />nhẹ việc cả tuần</h2>
        </div>
        <div className="planner-heading-copy">
          <p>
            Chọn món cho từng ngày, điều chỉnh số người và nhận ngay danh sách
            nguyên liệu đã được cộng dồn.
          </p>
          <div className="planner-summary">
            <span><b>{plannedCount}/7</b> ngày có món</span>
            <span><b>{shoppingItems.length}</b> nguyên liệu</span>
            <span><b>{checkedCount}</b> đã chuẩn bị</span>
          </div>
        </div>
      </div>

      <div className="planner-actions">
        <button className="primary-cta" onClick={onLoadSample}>
          Nạp thực đơn mẫu
        </button>
        <button
          className="outline-action"
          onClick={() => {
            if (!plannedCount || window.confirm("Xóa toàn bộ thực đơn tuần hiện tại?")) {
              onClear();
            }
          }}
        >
          Làm mới tuần
        </button>
      </div>

      <div className="tray-planner">
        <div className="tray-controls">
          <div>
            <p className="section-kicker">Mâm cơm Việt</p>
            <h3>Thực đơn trưa - chiều theo ngân sách</h3>
            <p>
              Mỗi bữa có cơm, canh, món mặn, rau xào hoặc luộc. Định mức được
              tính theo số người ăn và tiền chợ mỗi người.
            </p>
          </div>
          <div className="tray-inputs">
            <label>
              <span>Số người ăn</span>
              <input
                type="number"
                min={1}
                max={20}
                value={trayDiners}
                onChange={(event) =>
                  setTrayDiners(Math.min(20, Math.max(1, Number(event.target.value) || 1)))
                }
              />
            </label>
            <label>
              <span>Định mức/người/bữa</span>
              <select
                value={budgetPerPerson}
                onChange={(event) => setBudgetPerPerson(Number(event.target.value))}
              >
                <option value={25000}>25.000đ/người</option>
                <option value={30000}>30.000đ/người</option>
                <option value={40000}>40.000đ/người</option>
                <option value={50000}>50.000đ/người</option>
                <option value={70000}>70.000đ/người</option>
              </select>
            </label>
          </div>
        </div>

        <div className="tray-budget">
          <span><b>{formatMoney(mealBudget.perMeal)}</b> / bữa</span>
          <span><b>{formatMoney(mealBudget.perDay)}</b> / ngày</span>
          <span><b>{formatMoney(mealBudget.perWeek)}</b> / tuần</span>
          <p>{mealBudget.guidance}</p>
        </div>

        <div className="tray-week">
          {vietnameseTrayWeek.map((day) => (
            <article key={day.day} className="tray-day">
              <h4>{day.day}</h4>
              {[day.lunch, day.dinner].map((meal) => (
                <section key={meal.session} className="tray-meal">
                  <div className="tray-meal-head">
                    <span>{meal.session}</span>
                    <strong>{formatMoney(mealBudget.perMeal)}</strong>
                  </div>
                  <ul>
                    <li><b>Cơm</b><span>{meal.rice}</span></li>
                    <li><b>Canh</b><span>{meal.soup}</span></li>
                    <li><b>Mặn</b><span>{meal.savory}</span></li>
                    <li><b>Xào</b><span>{meal.vegetable}</span></li>
                    {meal.boiled && <li><b>Luộc/kèm</b><span>{meal.boiled}</span></li>}
                  </ul>
                  <p>{meal.note}</p>
                </section>
              ))}
            </article>
          ))}
        </div>
      </div>

      <div className="planner-days">
        {planner.map((slot, index) => {
          const recipe =
            slot.recipeId === null ? undefined : recipeMap.get(slot.recipeId);
          return (
            <article
              className={`planner-day ${recipe ? "filled" : ""}`}
              key={slot.day}
            >
              <div className="planner-day-head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{slot.day}</strong>
              </div>
              {recipe ? (
                <>
                  <button
                    className="planner-recipe-preview"
                    onClick={() => onOpenRecipe(recipe)}
                    aria-label={`Xem ${recipe.name}`}
                  >
                    <span className="planner-thumb">
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt=""
                          fill
                          sizes="72px"
                        />
                      ) : (
                        <b>{recipe.name.slice(0, 1)}</b>
                      )}
                    </span>
                    <span>
                      <small>{recipe.region}</small>
                      <strong>{recipe.name}</strong>
                      <em>{recipe.time} phút · {recipe.difficulty}</em>
                    </span>
                  </button>
                  <div className="planner-servings">
                    <span>Khẩu phần</span>
                    <div>
                      <button
                        onClick={() => onChangeServings(index, -1)}
                        aria-label={`Giảm khẩu phần ${slot.day}`}
                      >
                        −
                      </button>
                      <strong>{slot.servings} người</strong>
                      <button
                        onClick={() => onChangeServings(index, 1)}
                        aria-label={`Tăng khẩu phần ${slot.day}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="planner-empty">
                  <span>+</span>
                  <p>Chưa chọn món</p>
                </div>
              )}
              <label className="planner-select">
                <span className="sr-only">Chọn món cho {slot.day}</span>
                <select
                  value={slot.recipeId ?? ""}
                  onChange={(event) =>
                    onSetRecipe(
                      index,
                      event.target.value ? Number(event.target.value) : null,
                    )
                  }
                >
                  <option value="">Chọn món cho {slot.day}</option>
                  {recipes.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name} · {item.region}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          );
        })}
      </div>

      <div className="shopping-panel">
        <div className="shopping-heading">
          <div>
            <p className="section-kicker">Tự động cộng dồn</p>
            <h3>Danh sách đi chợ</h3>
            <p>
              Định lượng thay đổi theo khẩu phần của từng ngày. Đánh dấu những
              nguyên liệu đã có hoặc đã mua.
            </p>
          </div>
          <div className="shopping-actions">
            <button onClick={copyShoppingList}>Sao chép</button>
            <button onClick={() => window.print()}>In danh sách</button>
            {checkedCount > 0 && (
              <button onClick={onClearCheckedShoppingItems}>
                Bỏ đánh dấu
              </button>
            )}
          </div>
        </div>

        {shoppingItems.length ? (
          <div className="shopping-groups">
            {groupedShoppingItems.map(({ group, items }) =>
              items.length ? (
                <section key={group}>
                  <div className="shopping-group-title">
                    <h4>{group}</h4>
                    <span>{items.length} mục</span>
                  </div>
                  <ul>
                    {items.map((item) => {
                      const checked = checkedShoppingItems.includes(item.key);
                      return (
                        <li className={checked ? "checked" : ""} key={item.key}>
                          <label>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => onToggleShoppingItem(item.key)}
                            />
                            <span className="shopping-check" aria-hidden="true">
                              {checked ? "✓" : ""}
                            </span>
                            <span className="shopping-amount">
                              <strong>{formatAmount(item.amount)}</strong>
                              <small>{item.unit}</small>
                            </span>
                            <span className="shopping-name">
                              <strong>{item.item}</strong>
                              <small>Dùng cho {item.recipes.join(", ")}</small>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null,
            )}
          </div>
        ) : (
          <div className="shopping-empty">
            <span>01</span>
            <div>
              <h4>Danh sách sẽ xuất hiện tại đây</h4>
              <p>Chọn ít nhất một món trong kế hoạch tuần để bắt đầu.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
