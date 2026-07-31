"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  canteenRecipes,
  featuredRecipeIds,
  Recipe,
  recipes,
  RegionKey,
  regions,
} from "./recipes";
import { officialBusinessLinks, startupSteps, weeklyMenus } from "./guides";
import MealPlanner from "./meal-planner";
import {
  buildShoppingList,
  createEmptyPlanner,
  createSamplePlanner,
  PlannerSlot,
  plannerDays,
} from "./planner";

type RegionFilter = "Tất cả" | RegionKey;

const featured = featuredRecipeIds
  .map((id) => recipes.find((recipe) => recipe.id === id))
  .filter(Boolean) as Recipe[];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? "filled" : ""}>
    <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const familyLabels = [
  "Món nước",
  "Cơm",
  "Mì xào",
  "Cà ri",
  "Kho hầm",
  "Nướng",
  "Chiên",
  "Xào",
  "Hấp luộc",
  "Gỏi salad",
  "Bánh bột",
  "Món ngọt",
];

function RecipeArtwork({
  recipe,
  modal = false,
}: {
  recipe: Recipe;
  modal?: boolean;
}) {
  const family =
    recipe.tags.find((tag) => familyLabels.includes(tag)) ??
    (recipe.tags.includes("Cơm quán") ? "Cơm quán" : "Món Việt");
  const tone = recipe.region
    .toLocaleLowerCase("vi")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <span className={`recipe-art recipe-art-${tone} ${modal ? "modal-art" : ""}`}>
      <small>{family}</small>
      <strong>{recipe.baseName}</strong>
      <em>Minh họa theo nhóm món</em>
    </span>
  );
}

function RecipeCard({
  recipe,
  favorite,
  onFavorite,
  onOpen,
}: {
  recipe: Recipe;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="recipe-card">
      <button className="recipe-image" onClick={onOpen} aria-label={`Xem ${recipe.name}`}>
        {recipe.image ? (
          <Image src={recipe.image} alt={recipe.name} fill sizes="(max-width: 620px) 100vw, (max-width: 1180px) 50vw, 25vw" />
        ) : (
          <RecipeArtwork recipe={recipe} />
        )}
        <span className="region-badge">{recipe.region}</span>
      </button>
      <div className="recipe-card-body">
        <div className="recipe-card-topline">
          <span>{recipe.origin}</span>
          <button
            className={`icon-button heart-button ${favorite ? "active" : ""}`}
            onClick={onFavorite}
            aria-label={favorite ? `Bỏ yêu thích ${recipe.name}` : `Yêu thích ${recipe.name}`}
          >
            <HeartIcon filled={favorite} />
          </button>
        </div>
        <span className={`quality-badge ${recipe.editorialStatus === "Đang rà soát" ? "reviewing" : ""}`}>
          {recipe.editorialStatus}
        </span>
        <button className="recipe-title-button" onClick={onOpen}>
          <h3>{recipe.name}</h3>
        </button>
        <p>{recipe.description.split(".")[0]}.</p>
        <div className="recipe-meta">
          <span><ClockIcon /> {recipe.time} phút</span>
          <span>{recipe.difficulty}</span>
          <button onClick={onOpen} aria-label={`Mở công thức ${recipe.name}`}><ArrowIcon /></button>
        </div>
      </div>
    </article>
  );
}

function RecipeModal({
  recipe,
  favorite,
  onFavorite,
  onAddToPlanner,
  onClose,
}: {
  recipe: Recipe;
  favorite: boolean;
  onFavorite: () => void;
  onAddToPlanner: (dayIndex: number) => void;
  onClose: () => void;
}) {
  const [checked, setChecked] = useState<number[]>([]);
  const [servings, setServings] = useState(recipe.servings);
  const [plannerDayIndex, setPlannerDayIndex] = useState(0);
  const scale = servings / recipe.servings;

  const formatAmount = (amount: number | string) => {
    if (typeof amount === "string") return amount;
    const scaled = amount * scale;
    if (scaled < 10) return Number(scaled.toFixed(1)).toLocaleString("vi-VN");
    return Math.round(scaled).toLocaleString("vi-VN");
  };

  const ingredientGroups = ["Phần chính", "Gia vị", "Ăn kèm"] as const;

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="recipe-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Đóng công thức">×</button>
        <div className="modal-hero">
          {recipe.image ? (
            <Image src={recipe.image} alt={recipe.name} fill sizes="(max-width: 980px) 100vw, 980px" priority />
          ) : (
            <RecipeArtwork recipe={recipe} modal />
          )}
          <div className="modal-hero-overlay">
            <span>{recipe.region} · {recipe.origin}</span>
            <h2 id="recipe-modal-title">{recipe.name}</h2>
            <div className="modal-stats">
              <span><strong>{recipe.time}</strong> phút tổng</span>
              <span><strong>{recipe.prepTime} + {recipe.cookTime}</strong> sơ chế + nấu</span>
              <span><strong>{recipe.difficulty}</strong> độ khó</span>
            </div>
          </div>
        </div>
        <div className="modal-content">
          <div className="modal-intro">
            <div>
              <span className="variation-label">{recipe.variation}</span>
              <p>{recipe.description}</p>
              <div className="editorial-meta">
                <span className={recipe.editorialStatus === "Đang rà soát" ? "reviewing" : ""}>
                  {recipe.editorialStatus}
                </span>
                <small>Phiên bản {recipe.contentVersion}</small>
                <small>{recipe.imageStatus}</small>
              </div>
            </div>
            <div className="modal-intro-actions">
              <button className={`save-recipe ${favorite ? "active" : ""}`} onClick={onFavorite}>
                <HeartIcon filled={favorite} /> {favorite ? "Đã lưu món" : "Lưu món này"}
              </button>
              <div className="modal-plan-action">
                <label>
                  <span>Thêm vào</span>
                  <select
                    value={plannerDayIndex}
                    onChange={(event) => setPlannerDayIndex(Number(event.target.value))}
                  >
                    {plannerDays.map((day, index) => (
                      <option value={index} key={day}>{day}</option>
                    ))}
                  </select>
                </label>
                <button onClick={() => onAddToPlanner(plannerDayIndex)}>
                  + Thực đơn tuần
                </button>
              </div>
            </div>
          </div>
          <div className="recipe-columns">
            <aside>
              <p className="section-kicker">Chuẩn bị</p>
              <h3>Nguyên liệu</h3>
              <div className="serving-control" aria-label="Điều chỉnh khẩu phần">
                <span>Khẩu phần</span>
                <div>
                  <button onClick={() => setServings((value) => Math.max(1, value - 1))} aria-label="Giảm khẩu phần">−</button>
                  <strong>{servings} người</strong>
                  <button onClick={() => setServings((value) => Math.min(12, value + 1))} aria-label="Tăng khẩu phần">+</button>
                </div>
              </div>
              {ingredientGroups.map((group) => {
                const items = recipe.ingredients.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <div className="ingredient-group" key={group}>
                    <h4>{group}</h4>
                    <ul className="ingredient-list">
                      {items.map((item, index) => (
                        <li key={`${item.item}-${index}`}>
                          <span>
                            <strong>{formatAmount(item.amount)} {item.unit}</strong> {item.item}
                            {item.optional && <em> tùy chọn</em>}
                          </span>
                          {item.prep && <small>{item.prep}</small>}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </aside>
            <div>
              <p className="section-kicker">Thực hiện</p>
              <h3>{recipe.steps.length} bước vào bếp</h3>
              <ol className="step-list">
                {recipe.steps.map((recipeStep, index) => {
                  const isChecked = checked.includes(index);
                  return (
                    <li key={`${recipeStep.title}-${index}`} className={isChecked ? "done" : ""}>
                      <button
                        onClick={() =>
                          setChecked((current) =>
                            current.includes(index)
                              ? current.filter((item) => item !== index)
                              : [...current, index],
                          )
                        }
                        aria-label={`${isChecked ? "Bỏ đánh dấu" : "Đánh dấu"} bước ${index + 1}`}
                      >
                        {isChecked ? "✓" : index + 1}
                      </button>
                      <div>
                        <div className="step-heading">
                          <strong>{recipeStep.title}</strong>
                          {(recipeStep.duration || recipeStep.temperature) && (
                            <span>
                              {[recipeStep.duration, recipeStep.temperature].filter(Boolean).join(" · ")}
                            </span>
                          )}
                        </div>
                        <p>{recipeStep.instruction}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="chef-note">
                <strong>Mẹo để thành công</strong>
                <p>{recipe.tips[0]}</p>
              </div>
            </div>
          </div>
          <div className="recipe-detail-grid">
            <section>
              <p className="section-kicker">Dấu hiệu đạt</p>
              <h4>Món đã chín đúng</h4>
              <p>{recipe.doneness}</p>
            </section>
            <section className="safety-card">
              <p className="section-kicker">An toàn thực phẩm</p>
              <h4>Lưu ý quan trọng</h4>
              <p>{recipe.safety}</p>
            </section>
            <section>
              <p className="section-kicker">Dụng cụ</p>
              <h4>Chuẩn bị trước</h4>
              <ul>{recipe.equipment.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <p className="section-kicker">Dị ứng</p>
              <h4>Thành phần cần lưu ý</h4>
              <div className="allergen-list">
                {recipe.allergens.length
                  ? recipe.allergens.map((item) => <span key={item}>{item}</span>)
                  : <span>Không có chất dị ứng phổ biến được nhận diện</span>}
              </div>
            </section>
            <section>
              <p className="section-kicker">Thay thế</p>
              <h4>Linh hoạt nguyên liệu</h4>
              <ul>{recipe.substitutions.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <p className="section-kicker">Bảo quản</p>
              <h4>Dùng món an toàn</h4>
              <p>{recipe.storage}</p>
            </section>
          </div>
          <p className="source-note">{recipe.sourceNote}</p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<RegionFilter>("Tất cả");
  const [visibleCount, setVisibleCount] = useState(12);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem("an-gi-hom-nay-favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);
  const [notice, setNotice] = useState("");
  const [planner, setPlanner] = useState<PlannerSlot[]>(() => {
    if (typeof window === "undefined") return createEmptyPlanner();
    try {
      const stored = window.localStorage.getItem("an-gi-hom-nay-planner");
      const parsed = stored ? JSON.parse(stored) : null;
      return Array.isArray(parsed) && parsed.length === 7
        ? parsed
        : createEmptyPlanner();
    } catch {
      return createEmptyPlanner();
    }
  });
  const [checkedShoppingItems, setCheckedShoppingItems] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem("an-gi-hom-nay-shopping");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [businessInputs, setBusinessInputs] = useState({
    portionsPerDay: 80,
    pricePerPortion: 35000,
    ingredientCost: 15000,
    packagingCost: 2000,
    fixedCostPerMonth: 25000000,
    sellingDays: 26,
  });

  const businessResult = useMemo(() => {
    const contributionPerPortion =
      businessInputs.pricePerPortion -
      businessInputs.ingredientCost -
      businessInputs.packagingCost;
    const monthlyPortions =
      businessInputs.portionsPerDay * businessInputs.sellingDays;
    const revenue = monthlyPortions * businessInputs.pricePerPortion;
    const variableCost =
      monthlyPortions *
      (businessInputs.ingredientCost + businessInputs.packagingCost);
    const estimatedProfit =
      revenue - variableCost - businessInputs.fixedCostPerMonth;
    const breakEvenPerDay =
      contributionPerPortion > 0 && businessInputs.sellingDays > 0
        ? Math.ceil(
            businessInputs.fixedCostPerMonth /
              contributionPerPortion /
              businessInputs.sellingDays,
          )
        : null;
    const foodCostRatio =
      businessInputs.pricePerPortion > 0
        ? (businessInputs.ingredientCost /
            businessInputs.pricePerPortion) *
          100
        : 0;

    return {
      revenue,
      estimatedProfit,
      breakEvenPerDay,
      foodCostRatio,
      contributionPerPortion,
    };
  }, [businessInputs]);

  const shoppingItems = useMemo(
    () => buildShoppingList(planner, recipes),
    [planner],
  );

  useEffect(() => {
    window.localStorage.setItem("an-gi-hom-nay-planner", JSON.stringify(planner));
  }, [planner]);

  useEffect(() => {
    window.localStorage.setItem(
      "an-gi-hom-nay-shopping",
      JSON.stringify(checkedShoppingItems),
    );
  }, [checkedShoppingItems]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const money = (value: number) =>
    Math.round(value).toLocaleString("vi-VN") + " ₫";

  const updateBusinessInput = (
    key: keyof typeof businessInputs,
    value: number,
  ) => {
    setBusinessInputs((current) => ({
      ...current,
      [key]: Number.isFinite(value) ? Math.max(0, value) : 0,
    }));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      window.localStorage.setItem("an-gi-hom-nay-favorites", JSON.stringify(next));
      return next;
    });
  };

  const setPlannerRecipe = (index: number, recipeId: number | null) => {
    setPlanner((current) =>
      current.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, recipeId } : slot,
      ),
    );
    setNotice(recipeId === null ? "Đã bỏ món khỏi ngày đã chọn." : `Đã cập nhật ${plannerDays[index]}.`);
  };

  const addRecipeToPlanner = (recipeId: number, dayIndex: number) => {
    setPlannerRecipe(dayIndex, recipeId);
    setSelectedRecipe(null);
    setNotice(`Đã thêm món vào ${plannerDays[dayIndex]}.`);
  };

  const changePlannerServings = (index: number, delta: number) => {
    setPlanner((current) =>
      current.map((slot, slotIndex) =>
        slotIndex === index
          ? { ...slot, servings: Math.min(20, Math.max(1, slot.servings + delta)) }
          : slot,
      ),
    );
  };

  const toggleShoppingItem = (key: string) => {
    setCheckedShoppingItems((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  };

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return recipes.filter((recipe) => {
      const matchesRegion =
        activeRegion === "Tất cả" || recipe.region === activeRegion;
      const matchesFavorite = !showFavorites || favorites.includes(recipe.id);
      const matchesQuery =
        !normalizedQuery ||
        `${recipe.name} ${recipe.region} ${recipe.origin} ${recipe.tags.join(" ")}`
          .toLocaleLowerCase("vi")
          .includes(normalizedQuery);
      return matchesRegion && matchesFavorite && matchesQuery;
    });
  }, [activeRegion, favorites, query, showFavorites]);

  const explore = () => {
    document.getElementById("kho-mon")?.scrollIntoView({ behavior: "smooth" });
  };

  const suggestRecipe = () => {
    const pool = filteredRecipes.length ? filteredRecipes : recipes;
    const recipe = pool[Math.floor(Math.random() * pool.length)];
    setSelectedRecipe(recipe);
  };

  const chooseRegion = (region: RegionFilter) => {
    setActiveRegion(region);
    setShowFavorites(false);
    setVisibleCount(12);
    requestAnimationFrame(explore);
  };

  const showAllCanteenRecipes = () => {
    setQuery("Cơm quán");
    setActiveRegion("Tất cả");
    setShowFavorites(false);
    setVisibleCount(12);
    requestAnimationFrame(explore);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Ăn gì hôm nay — Trang chủ">
          <span className="brand-mark">Ă</span>
          <span>
            <strong>Ăn gì</strong>
            <small>hôm nay</small>
          </span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Điều hướng chính">
          <a href="#mon-viet" onClick={() => setMenuOpen(false)}>Món Việt</a>
          <a href="#com-quan" onClick={() => setMenuOpen(false)}>Cơm quán</a>
          <a href="#ke-hoach-tuan" onClick={() => setMenuOpen(false)}>Kế hoạch tuần</a>
          <a href="#mo-quan" onClick={() => setMenuOpen(false)}>Mở quán</a>
          <a href="#kho-mon" onClick={() => setMenuOpen(false)}>300 món chọn lọc</a>
        </nav>
        <div className="header-actions">
          <button
            className={`favorite-link ${showFavorites ? "active" : ""}`}
            onClick={() => {
              setShowFavorites((current) => !current);
              setVisibleCount(12);
              requestAnimationFrame(explore);
            }}
          >
            <HeartIcon filled={showFavorites} />
            <span>Món đã lưu</span>
            {favorites.length > 0 && <b>{favorites.length}</b>}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Mở menu">
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Tinh hoa trong từng căn bếp</p>
          <h1>Hôm nay,<br />mình <em>ăn gì?</em></h1>
          <p className="hero-description">
            Từ mâm cơm ba miền đến tinh hoa ẩm thực năm châu.
            300 công thức chọn lọc, trong đó 210 món Việt Nam được ưu tiên
            theo ba miền và từng kỹ thuật nấu đặc trưng.
          </p>
          <div className="hero-search">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(12);
              }}
              onKeyDown={(event) => event.key === "Enter" && explore()}
              placeholder="Tìm món ăn, nguyên liệu, vùng miền..."
              aria-label="Tìm kiếm món ăn"
            />
            <button onClick={explore}>Tìm món</button>
          </div>
          <div className="hero-actions">
            <button className="primary-cta" onClick={suggestRecipe}>
              Gợi ý món hôm nay <ArrowIcon />
            </button>
            <button className="text-cta" onClick={explore}>
              Khám phá 300 món
            </button>
          </div>
          <div className="hero-stats" aria-label="Thống kê kho món">
            <div><strong>300</strong><span>món duy nhất</span></div>
            <div><strong>3 miền</strong><span>Việt Nam</span></div>
            <div><strong>6</strong><span>châu lục</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Ba món Việt Nam nổi tiếng">
          <div className="pattern-lotus" />
          <button className="food-frame food-frame-main" onClick={() => setSelectedRecipe(featured[0])}>
            <Image src="/food/pho-bo.webp" alt="Phở bò Hà Nội" fill sizes="(max-width: 900px) 64vw, 32vw" priority />
            <span><small>Tinh hoa Bắc Bộ</small>Phở bò Hà Nội</span>
          </button>
          <button className="food-frame food-frame-top" onClick={() => setSelectedRecipe(featured[1])}>
            <Image src="/food/bun-bo-hue.webp" alt="Bún bò Huế" fill sizes="(max-width: 900px) 38vw, 22vw" priority />
            <span><small>Đậm đà miền Trung</small>Bún bò Huế</span>
          </button>
          <button className="food-frame food-frame-bottom" onClick={() => setSelectedRecipe(featured[2])}>
            <Image src="/food/banh-xeo.webp" alt="Bánh xèo miền Tây" fill sizes="(max-width: 900px) 42vw, 24vw" priority />
            <span><small>Hào sảng phương Nam</small>Bánh xèo</span>
          </button>
          <span className="stamp">300<br /><small>món chọn lọc</small></span>
        </div>
      </section>

      <section className="heritage-strip" id="mon-viet">
        <p>Từ Bắc vào Nam</p>
        <h2>Một dải hương vị Việt</h2>
        <div className="heritage-cards">
          {regions.slice(1, 4).map((region, index) => (
            <button key={region.key} onClick={() => chooseRegion(region.key)}>
              <span>0{index + 1}</span>
              <div>
                <small>{region.eyebrow}</small>
                <strong>{region.key}</strong>
                <p>{region.description}</p>
              </div>
              <ArrowIcon />
            </button>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Được yêu thích nhất</p>
            <h2>Món Việt trong tim</h2>
          </div>
          <button onClick={() => chooseRegion("Tất cả")}>Xem tất cả <ArrowIcon /></button>
        </div>
        <div className="featured-grid">
          {featured.slice(0, 3).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              favorite={favorites.includes(recipe.id)}
              onFavorite={() => toggleFavorite(recipe.id)}
              onOpen={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </section>

      <section className="canteen-section" id="com-quan">
        <div className="section-heading canteen-heading">
          <div>
            <p className="section-kicker">50 món bán hằng ngày</p>
            <h2>Cơm ngon cho quán Việt</h2>
            <p className="section-description">
              Mỗi công thức được chuẩn hóa thành suất cơm gồm món chính, cơm,
              rau và canh — phù hợp quán cơm bình dân lẫn cơm văn phòng.
            </p>
          </div>
          <button onClick={showAllCanteenRecipes}>
            Xem đủ 50 món <ArrowIcon />
          </button>
        </div>
        <div className="canteen-benefits">
          <span><b>01</b> Định lượng 4 suất</span>
          <span><b>02</b> Quy trình theo mẻ</span>
          <span><b>03</b> Gợi ý chia suất</span>
          <span><b>04</b> Lưu ý bảo quản</span>
        </div>
        <div className="canteen-grid">
          {canteenRecipes.slice(0, 6).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              favorite={favorites.includes(recipe.id)}
              onFavorite={() => toggleFavorite(recipe.id)}
              onOpen={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </section>

      <MealPlanner
        planner={planner}
        recipes={recipes}
        shoppingItems={shoppingItems}
        checkedShoppingItems={checkedShoppingItems}
        onSetRecipe={setPlannerRecipe}
        onChangeServings={changePlannerServings}
        onLoadSample={() => {
          setPlanner(createSamplePlanner(recipes));
          setCheckedShoppingItems([]);
          setNotice("Đã nạp thực đơn mẫu cho 7 ngày.");
        }}
        onClear={() => {
          setPlanner(createEmptyPlanner());
          setCheckedShoppingItems([]);
          setNotice("Đã làm mới kế hoạch tuần.");
        }}
        onToggleShoppingItem={toggleShoppingItem}
        onClearCheckedShoppingItems={() => setCheckedShoppingItems([])}
        onOpenRecipe={setSelectedRecipe}
        onNotice={setNotice}
      />

      <section className="weekly-section" id="thuc-don-tuan">
        <div className="weekly-intro">
          <p className="section-kicker">Bếp nhà nhẹ việc</p>
          <h2>Thực đơn trọn tuần</h2>
          <p>
            Bốn tuần gợi ý, mỗi ngày ba món cân đối giữa món chính, rau và
            canh. Có mẹo chuẩn bị trước để giảm thời gian đứng bếp.
          </p>
          <div className="week-tabs" role="tablist" aria-label="Chọn thực đơn tuần">
            {weeklyMenus.map((week, index) => (
              <button
                key={week.id}
                className={activeWeek === index ? "active" : ""}
                onClick={() => setActiveWeek(index)}
                role="tab"
                aria-selected={activeWeek === index}
              >
                Tuần {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="weekly-board">
          <div className="weekly-board-heading">
            <div>
              <span>Thực đơn đề xuất</span>
              <h3>{weeklyMenus[activeWeek].title}</h3>
            </div>
            <p>{weeklyMenus[activeWeek].description}</p>
          </div>
          <div className="weekly-days">
            {weeklyMenus[activeWeek].days.map((day, index) => (
              <article key={day.day}>
                <div className="day-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h4>{day.day}</h4>
                  <ul>
                    {day.dishes.map((dish) => <li key={dish}>{dish}</li>)}
                  </ul>
                  <p><b>Chuẩn bị trước:</b> {day.prepTip}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="startup-section" id="mo-quan">
        <div className="startup-header">
          <div>
            <p className="section-kicker">Từ căn bếp đến cửa hàng</p>
            <h2>Bộ khởi nghiệp quán cơm</h2>
          </div>
          <p>
            Lập thực đơn, chuẩn hóa định lượng, kiểm tra điểm hòa vốn và
            chuẩn bị vận hành trước khi đầu tư lớn.
          </p>
        </div>

        <div className="startup-layout">
          <div className="startup-roadmap">
            {startupSteps.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>{item.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>

          <aside className="business-calculator">
            <p className="section-kicker">Máy tính kinh doanh</p>
            <h3>Ước tính điểm hòa vốn</h3>
            <p className="calculator-intro">
              Thay số liệu mẫu bằng chi phí thực tế của quán để xem kết quả.
            </p>
            <div className="calculator-fields">
              <label>
                <span>Số suất/ngày</span>
                <input
                  type="number"
                  min="0"
                  value={businessInputs.portionsPerDay}
                  onChange={(event) => updateBusinessInput("portionsPerDay", Number(event.target.value))}
                />
              </label>
              <label>
                <span>Số ngày bán/tháng</span>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={businessInputs.sellingDays}
                  onChange={(event) => updateBusinessInput("sellingDays", Number(event.target.value))}
                />
              </label>
              <label>
                <span>Giá bán/suất (₫)</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={businessInputs.pricePerPortion}
                  onChange={(event) => updateBusinessInput("pricePerPortion", Number(event.target.value))}
                />
              </label>
              <label>
                <span>Nguyên liệu/suất (₫)</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={businessInputs.ingredientCost}
                  onChange={(event) => updateBusinessInput("ingredientCost", Number(event.target.value))}
                />
              </label>
              <label>
                <span>Bao bì/suất (₫)</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={businessInputs.packagingCost}
                  onChange={(event) => updateBusinessInput("packagingCost", Number(event.target.value))}
                />
              </label>
              <label>
                <span>Chi phí cố định/tháng (₫)</span>
                <input
                  type="number"
                  min="0"
                  step="500000"
                  value={businessInputs.fixedCostPerMonth}
                  onChange={(event) => updateBusinessInput("fixedCostPerMonth", Number(event.target.value))}
                />
              </label>
            </div>
            <div className="calculator-results" aria-live="polite">
              <div><span>Doanh thu ước tính</span><strong>{money(businessResult.revenue)}</strong></div>
              <div><span>Lãi góp mỗi suất</span><strong>{money(businessResult.contributionPerPortion)}</strong></div>
              <div><span>Giá vốn nguyên liệu</span><strong>{businessResult.foodCostRatio.toFixed(1)}%</strong></div>
              <div>
                <span>Hòa vốn khoảng</span>
                <strong>
                  {businessResult.breakEvenPerDay === null
                    ? "Chưa thể tính"
                    : `${businessResult.breakEvenPerDay} suất/ngày`}
                </strong>
              </div>
              <div className={businessResult.estimatedProfit >= 0 ? "positive" : "negative"}>
                <span>Lợi nhuận ước tính</span>
                <strong>{money(businessResult.estimatedProfit)}</strong>
              </div>
            </div>
            <p className="calculator-note">
              Đây là mô hình ước tính, chưa bao gồm thuế, khấu hao, hao hụt,
              phí nền tảng giao đồ ăn và chi phí phát sinh.
            </p>
          </aside>
        </div>

        <div className="official-guides">
          <div>
            <strong>Nguồn chính thức cần kiểm tra trước khi mở bán</strong>
            <p>Quy định có thể thay đổi theo thời điểm và địa phương.</p>
          </div>
          <div>
            {officialBusinessLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <ArrowIcon />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="world-section" id="the-gioi">
        <div className="world-intro">
          <p className="section-kicker">Bản đồ vị giác</p>
          <h2>Đi một vòng<br /><em>thế giới</em></h2>
          <p>Mỗi căn bếp là một câu chuyện. Chọn điểm đến và bắt đầu hành trình bằng món ăn.</p>
          <button className="light-button" onClick={() => chooseRegion("Châu Âu")}>
            Khám phá món thế giới <ArrowIcon />
          </button>
        </div>
        <div className="world-regions">
          {regions.slice(4).map((region, index) => (
            <button key={region.key} onClick={() => chooseRegion(region.key)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{region.key}</strong><small>{region.description}</small></div>
              <ArrowIcon />
            </button>
          ))}
        </div>
      </section>

      <section className="library-section" id="kho-mon">
        <div className="library-heading">
          <div>
            <p className="section-kicker">Kho công thức</p>
            <h2>Hôm nay vào bếp</h2>
          </div>
          <p>{filteredRecipes.length.toLocaleString("vi-VN")} món đang chờ bạn khám phá</p>
        </div>

        <div className="library-toolbar">
          <div className="filter-scroll" role="group" aria-label="Lọc theo vùng">
            {regions.map((region) => (
              <button
                key={region.key}
                className={activeRegion === region.key ? "active" : ""}
                onClick={() => {
                  setActiveRegion(region.key);
                  setShowFavorites(false);
                  setVisibleCount(12);
                }}
              >
                {region.key}
              </button>
            ))}
          </div>
          <label className="compact-search">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(12);
              }}
              placeholder="Tìm trong 300 món..."
            />
          </label>
        </div>

        {filteredRecipes.length > 0 ? (
          <>
            <div className="library-grid">
              {filteredRecipes.slice(0, visibleCount).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  favorite={favorites.includes(recipe.id)}
                  onFavorite={() => toggleFavorite(recipe.id)}
                  onOpen={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
            {visibleCount < filteredRecipes.length && (
              <button
                className="load-more"
                onClick={() => setVisibleCount((count) => count + 12)}
              >
                Xem thêm công thức
                <span>{Math.min(visibleCount, filteredRecipes.length)} / {filteredRecipes.length}</span>
              </button>
            )}
          </>
        ) : (
          <div className="empty-state">
            <span>🍲</span>
            <h3>Chưa tìm thấy món phù hợp</h3>
            <p>Thử một từ khóa khác hoặc xem toàn bộ kho công thức.</p>
            <button onClick={() => { setQuery(""); setActiveRegion("Tất cả"); setShowFavorites(false); }}>
              Xem tất cả món
            </button>
          </div>
        )}
      </section>

      <section className="story-section" id="ve-chung-toi">
        <div>
          <p className="section-kicker">Chuyện của căn bếp</p>
          <h2>Món ngon bắt đầu<br />từ sự <em>tử tế</em></h2>
        </div>
        <div>
          <p>
            “Ăn gì hôm nay” lưu giữ những công thức truyền thống Việt Nam,
            đồng thời mở cánh cửa đến những nền ẩm thực đặc sắc trên thế giới.
            Mỗi hướng dẫn đều được trình bày rõ ràng để bất kỳ ai cũng có thể bắt đầu.
          </p>
          <div className="story-values">
            <span><b>01</b> Dễ hiểu</span>
            <span><b>02</b> Đúng vị</span>
            <span><b>03</b> Dễ nấu</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">Ă</span>
          <div><strong>Ăn gì hôm nay</strong><p>300 công thức · Không trùng lặp</p></div>
        </div>
        <div className="footer-links">
          <a href="#mon-viet">Món Việt</a>
          <a href="#com-quan">Cơm quán</a>
          <a href="#ke-hoach-tuan">Kế hoạch tuần</a>
          <a href="#mo-quan">Mở quán</a>
        </div>
        <p className="copyright">© 2026 Ăn gì hôm nay. Nấu bằng niềm vui.</p>
      </footer>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          favorite={favorites.includes(selectedRecipe.id)}
          onFavorite={() => toggleFavorite(selectedRecipe.id)}
          onAddToPlanner={(dayIndex) => addRecipeToPlanner(selectedRecipe.id, dayIndex)}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
      {notice && (
        <div className="app-toast" role="status" aria-live="polite">
          <span>✓</span>{notice}
        </div>
      )}
    </main>
  );
}
