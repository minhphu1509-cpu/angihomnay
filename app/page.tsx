"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  featuredRecipeIds,
  Recipe,
  recipes,
  RegionKey,
  regions,
} from "./recipes";

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
        <Image src={recipe.image} alt={recipe.name} fill sizes="(max-width: 620px) 100vw, (max-width: 1180px) 50vw, 25vw" />
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
  onClose,
}: {
  recipe: Recipe;
  favorite: boolean;
  onFavorite: () => void;
  onClose: () => void;
}) {
  const [checked, setChecked] = useState<number[]>([]);
  const [servings, setServings] = useState(recipe.servings);
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
          <Image src={recipe.image} alt={recipe.name} fill sizes="(max-width: 980px) 100vw, 980px" priority />
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
            </div>
            <button className={`save-recipe ${favorite ? "active" : ""}`} onClick={onFavorite}>
              <HeartIcon filled={favorite} /> {favorite ? "Đã lưu món" : "Lưu món này"}
            </button>
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

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      window.localStorage.setItem("an-gi-hom-nay-favorites", JSON.stringify(next));
      return next;
    });
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
          <a href="#the-gioi" onClick={() => setMenuOpen(false)}>Thế giới</a>
          <a href="#kho-mon" onClick={() => setMenuOpen(false)}>Công thức</a>
          <a href="#ve-chung-toi" onClick={() => setMenuOpen(false)}>Câu chuyện</a>
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
            1.000 công thức được kể bằng hương vị, ký ức và niềm vui vào bếp.
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
              Khám phá 1.000 món
            </button>
          </div>
          <div className="hero-stats" aria-label="Thống kê kho món">
            <div><strong>1.000</strong><span>công thức</span></div>
            <div><strong>3 miền</strong><span>Việt Nam</span></div>
            <div><strong>6</strong><span>châu lục</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Ba món Việt Nam nổi tiếng">
          <div className="pattern-lotus" />
          <button className="food-frame food-frame-main" onClick={() => setSelectedRecipe(recipes[0])}>
            <Image src="/food/pho-bo.webp" alt="Phở bò Hà Nội" fill sizes="(max-width: 900px) 64vw, 32vw" priority />
            <span><small>Tinh hoa Bắc Bộ</small>Phở bò Hà Nội</span>
          </button>
          <button className="food-frame food-frame-top" onClick={() => setSelectedRecipe(recipes[100])}>
            <Image src="/food/bun-bo-hue.webp" alt="Bún bò Huế" fill sizes="(max-width: 900px) 38vw, 22vw" priority />
            <span><small>Đậm đà miền Trung</small>Bún bò Huế</span>
          </button>
          <button className="food-frame food-frame-bottom" onClick={() => setSelectedRecipe(recipes[200])}>
            <Image src="/food/banh-xeo.webp" alt="Bánh xèo miền Tây" fill sizes="(max-width: 900px) 42vw, 24vw" priority />
            <span><small>Hào sảng phương Nam</small>Bánh xèo</span>
          </button>
          <span className="stamp">1000<br /><small>món ngon</small></span>
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
              placeholder="Tìm trong 1.000 món..."
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
          <div><strong>Ăn gì hôm nay</strong><p>1.000 câu chuyện · 1.000 món ngon</p></div>
        </div>
        <div className="footer-links">
          <a href="#mon-viet">Món Việt</a>
          <a href="#the-gioi">Món thế giới</a>
          <a href="#kho-mon">Kho công thức</a>
        </div>
        <p className="copyright">© 2026 Ăn gì hôm nay. Nấu bằng niềm vui.</p>
      </footer>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          favorite={favorites.includes(selectedRecipe.id)}
          onFavorite={() => toggleFavorite(selectedRecipe.id)}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </main>
  );
}
