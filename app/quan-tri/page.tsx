"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Recipe,
  recipes,
  regions,
  VerificationStatus,
} from "../recipes";
import {
  cloneRecipe,
  CMS_DRAFTS_KEY,
  CMS_PUBLISHED_KEY,
  mergeRecipeRecords,
  parseRecipeRecordMap,
  RecipeRecordMap,
  validateRecipe,
} from "../cms-storage";
import styles from "./page.module.css";

type WorkspaceView = "Công thức" | "Thư viện ảnh";
type StatusFilter = "Tất cả" | VerificationStatus;

const verificationOptions: VerificationStatus[] = [
  "Đã kiểm chứng nội bộ",
  "Đã chuẩn hóa vận hành",
  "Chờ kiểm chứng",
];

const saveRecords = (key: string, records: RecipeRecordMap) => {
  window.localStorage.setItem(key, JSON.stringify(records));
};

const lines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function EditorialStudio() {
  const [drafts, setDrafts] = useState<RecipeRecordMap>({});
  const [published, setPublished] = useState<RecipeRecordMap>({});
  const [selectedId, setSelectedId] = useState(recipes[0].id);
  const [working, setWorking] = useState<Recipe>(cloneRecipe(recipes[0]));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Tất cả");
  const [view, setView] = useState<WorkspaceView>("Công thức");
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
    const storedDrafts = parseRecipeRecordMap(
      window.localStorage.getItem(CMS_DRAFTS_KEY),
    );
    const storedPublished = parseRecipeRecordMap(
      window.localStorage.getItem(CMS_PUBLISHED_KEY),
    );
    setDrafts(storedDrafts);
    setPublished(storedPublished);
    setWorking(
      cloneRecipe(
        storedDrafts[String(selectedId)] ??
          storedPublished[String(selectedId)] ??
          recipes[0],
      ),
    );
    setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedId]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const editorialRecipes = useMemo(
    () => mergeRecipeRecords(mergeRecipeRecords(recipes, published), drafts),
    [drafts, published],
  );

  const selectedBase = useMemo(
    () => recipes.find((recipe) => recipe.id === selectedId) ?? recipes[0],
    [selectedId],
  );

  const filteredRecipes = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi");
    return editorialRecipes.filter((recipe) => {
      const searchable = [
        recipe.name,
        recipe.baseName,
        recipe.region,
        recipe.origin,
        recipe.tags.join(" "),
        recipe.ingredients.map((item) => item.item).join(" "),
      ]
        .join(" ")
        .toLocaleLowerCase("vi");
      return (
        (!normalized || searchable.includes(normalized)) &&
        (statusFilter === "Tất cả" ||
          recipe.verificationStatus === statusFilter)
      );
    });
  }, [editorialRecipes, query, statusFilter]);

  const metrics = useMemo(
    () => ({
      verified: editorialRecipes.filter(
        (recipe) => recipe.verificationStatus === "Đã kiểm chứng nội bộ",
      ).length,
      standardized: editorialRecipes.filter(
        (recipe) => recipe.verificationStatus === "Đã chuẩn hóa vận hành",
      ).length,
      pending: editorialRecipes.filter(
        (recipe) => recipe.verificationStatus === "Chờ kiểm chứng",
      ).length,
      exactImages: editorialRecipes.filter(
        (recipe) => recipe.imageStatus === "Ảnh đúng món" && recipe.image,
      ).length,
    }),
    [editorialRecipes],
  );

  const issues = useMemo(() => validateRecipe(working), [working]);

  const selectRecipe = (id: number) => {
    const recipe =
      drafts[String(id)] ??
      published[String(id)] ??
      recipes.find((item) => item.id === id);
    if (!recipe) return;
    setSelectedId(id);
    setWorking(cloneRecipe(recipe));
  };

  const patch = <Key extends keyof Recipe>(key: Key, value: Recipe[Key]) => {
    setWorking((current) => ({ ...current, [key]: value }));
  };

  const updateIngredient = (
    index: number,
    update: Partial<Recipe["ingredients"][number]>,
  ) => {
    setWorking((current) => ({
      ...current,
      ingredients: current.ingredients.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...update } : item,
      ),
    }));
  };

  const updateStep = (
    index: number,
    update: Partial<Recipe["steps"][number]>,
  ) => {
    setWorking((current) => ({
      ...current,
      steps: current.steps.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...update } : item,
      ),
    }));
  };

  const saveDraft = () => {
    const next = {
      ...drafts,
      [String(working.id)]: {
        ...cloneRecipe(working),
        contentVersion: working.contentVersion || "2026.07",
      },
    };
    setDrafts(next);
    saveRecords(CMS_DRAFTS_KEY, next);
    setNotice(`Đã lưu bản nháp “${working.name}”.`);
  };

  const publishRecipe = () => {
    if (issues.length > 0) {
      setNotice("Cần xử lý các cảnh báo trước khi xuất bản.");
      return;
    }
    const record = {
      ...cloneRecipe(working),
      reviewedAt: working.reviewedAt || new Date().toISOString().slice(0, 10),
    };
    const nextDrafts = { ...drafts, [String(record.id)]: record };
    const nextPublished = { ...published, [String(record.id)]: record };
    setDrafts(nextDrafts);
    setPublished(nextPublished);
    saveRecords(CMS_DRAFTS_KEY, nextDrafts);
    saveRecords(CMS_PUBLISHED_KEY, nextPublished);
    setWorking(record);
    setNotice("Đã xuất bản trên thiết bị này và cập nhật trang công khai.");
  };

  const restoreRecipe = () => {
    const nextDrafts = { ...drafts };
    const nextPublished = { ...published };
    delete nextDrafts[String(selectedId)];
    delete nextPublished[String(selectedId)];
    setDrafts(nextDrafts);
    setPublished(nextPublished);
    saveRecords(CMS_DRAFTS_KEY, nextDrafts);
    saveRecords(CMS_PUBLISHED_KEY, nextPublished);
    setWorking(cloneRecipe(selectedBase));
    setNotice("Đã khôi phục dữ liệu gốc của món.");
  };

  const exportData = () => {
    const payload = JSON.stringify(
      {
        app: "Ăn gì hôm nay",
        exportedAt: new Date().toISOString(),
        version: 1,
        recipes: drafts,
      },
      null,
      2,
    );
    const url = URL.createObjectURL(
      new Blob([payload], { type: "application/json;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `an-gi-hom-nay-cms-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Đã xuất dữ liệu CMS.");
  };

  const importData = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as { recipes?: unknown } | unknown;
      const records = parseRecipeRecordMap(
        JSON.stringify(
          parsed &&
            typeof parsed === "object" &&
            "recipes" in parsed
            ? (parsed as { recipes: unknown }).recipes
            : parsed,
        ),
      );
      if (Object.keys(records).length === 0) {
        setNotice("Tệp không chứa hồ sơ công thức hợp lệ.");
        return;
      }
      const next = { ...drafts, ...records };
      setDrafts(next);
      saveRecords(CMS_DRAFTS_KEY, next);
      const selected = records[String(selectedId)];
      if (selected) setWorking(cloneRecipe(selected));
      setNotice(`Đã nhập ${Object.keys(records).length} hồ sơ vào bản nháp.`);
    } catch {
      setNotice("Không thể đọc tệp JSON này.");
    } finally {
      event.target.value = "";
    }
  };

  if (!ready) {
    return <main className={styles.loading}>Đang mở studio biên tập…</main>;
  }

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Về trang Ăn gì hôm nay">
          <span>Ă</span>
          <div>
            <strong>Ăn gì hôm nay</strong>
            <small>Editorial Studio</small>
          </div>
        </Link>
        <div className={styles.headerActions}>
          <label className={styles.importButton}>
            Nhập JSON
            <input type="file" accept="application/json" onChange={importData} />
          </label>
          <button onClick={exportData}>Xuất dữ liệu</button>
          <Link href="/">Xem trang công khai</Link>
        </div>
      </header>

      <section className={styles.overview}>
        <div>
          <p>Trung tâm nội dung</p>
          <h1>300 hồ sơ món ăn, một quy trình kiểm chứng rõ ràng.</h1>
          <span>
            Bản chỉnh sửa được lưu cục bộ. “Xuất bản” áp dụng ngay cho trang
            công khai trên cùng trình duyệt; tệp JSON dùng để bàn giao hoặc
            đồng bộ vào cơ sở dữ liệu sau này.
          </span>
        </div>
        <div className={styles.metrics}>
          <article><strong>300</strong><span>hồ sơ đầy đủ</span></article>
          <article><strong>{metrics.verified}</strong><span>đã kiểm chứng</span></article>
          <article><strong>{metrics.standardized}</strong><span>đã chuẩn hóa</span></article>
          <article><strong>{metrics.pending}</strong><span>chờ kiểm chứng</span></article>
          <article><strong>{metrics.exactImages}</strong><span>ảnh đúng món</span></article>
        </div>
      </section>

      <section className={styles.workspace}>
        <aside className={styles.catalog}>
          <div className={styles.viewTabs}>
            {(["Công thức", "Thư viện ảnh"] as WorkspaceView[]).map((item) => (
              <button
                key={item}
                className={view === item ? styles.activeTab : ""}
                onClick={() => setView(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            className={styles.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tên món, vùng, nguyên liệu…"
          />
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
          >
            <option>Tất cả</option>
            {verificationOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <p className={styles.resultCount}>{filteredRecipes.length} món</p>

          {view === "Công thức" ? (
            <div className={styles.recipeList}>
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  className={recipe.id === selectedId ? styles.selected : ""}
                  onClick={() => selectRecipe(recipe.id)}
                >
                  <span>{String(recipe.id).padStart(3, "0")}</span>
                  <div>
                    <strong>{recipe.name}</strong>
                    <small>{recipe.region} · {recipe.verificationStatus}</small>
                  </div>
                  {drafts[String(recipe.id)] && <i>Nháp</i>}
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.imageLibrary}>
              {filteredRecipes.map((recipe) => (
                <button key={recipe.id} onClick={() => selectRecipe(recipe.id)}>
                  <div
                    className={styles.imagePreview}
                    style={
                      recipe.image
                        ? { backgroundImage: `url("${recipe.image}")` }
                        : undefined
                    }
                  >
                    {!recipe.image && <span>{recipe.name.slice(0, 1)}</span>}
                  </div>
                  <strong>{recipe.name}</strong>
                  <small>{recipe.imageStatus}</small>
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className={styles.editor}>
          <div className={styles.editorTop}>
            <div>
              <p>Hồ sơ #{String(working.id).padStart(3, "0")}</p>
              <h2>{working.name}</h2>
              <span>
                {drafts[String(working.id)] ? "Có bản nháp" : "Theo dữ liệu gốc"}
                {published[String(working.id)] ? " · Đã xuất bản cục bộ" : ""}
              </span>
            </div>
            <div className={styles.editorActions}>
              <button className={styles.secondaryButton} onClick={restoreRecipe}>
                Khôi phục
              </button>
              <button className={styles.secondaryButton} onClick={saveDraft}>
                Lưu nháp
              </button>
              <button className={styles.primaryButton} onClick={publishRecipe}>
                Xuất bản
              </button>
            </div>
          </div>

          {issues.length > 0 && (
            <div className={styles.issues}>
              <strong>{issues.length} mục cần xử lý</strong>
              <ul>{issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>
            </div>
          )}

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>01</span>
              <div><h3>Nhận diện món</h3><p>Tên, xuất xứ và mô tả hiển thị.</p></div>
            </div>
            <div className={styles.formGrid}>
              <label className={styles.full}>
                <span>Tên món</span>
                <input value={working.name} onChange={(event) => patch("name", event.target.value)} />
              </label>
              <label>
                <span>Vùng</span>
                <select value={working.region} onChange={(event) => patch("region", event.target.value as Recipe["region"])}>
                  {regions.slice(1).map((region) => <option key={region.key}>{region.key}</option>)}
                </select>
              </label>
              <label>
                <span>Xuất xứ</span>
                <input value={working.origin} onChange={(event) => patch("origin", event.target.value)} />
              </label>
              <label>
                <span>Châu lục / quốc gia</span>
                <input value={working.continent} onChange={(event) => patch("continent", event.target.value)} />
              </label>
              <label>
                <span>Phiên bản nội dung</span>
                <input value={working.contentVersion} onChange={(event) => patch("contentVersion", event.target.value)} />
              </label>
              <label className={styles.full}>
                <span>Mô tả</span>
                <textarea rows={4} value={working.description} onChange={(event) => patch("description", event.target.value)} />
              </label>
              <label className={styles.full}>
                <span>Thẻ, phân cách bằng dấu phẩy</span>
                <input
                  value={working.tags.join(", ")}
                  onChange={(event) => patch("tags", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))}
                />
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>02</span>
              <div><h3>Thời gian và khẩu phần</h3><p>Định lượng mặc định cho người nấu.</p></div>
            </div>
            <div className={styles.compactGrid}>
              {([
                ["prepTime", "Sơ chế"],
                ["cookTime", "Nấu"],
                ["restTime", "Nghỉ"],
                ["time", "Tổng"],
                ["servings", "Khẩu phần"],
              ] as Array<[keyof Pick<Recipe, "prepTime" | "cookTime" | "restTime" | "time" | "servings">, string]>).map(([key, label]) => (
                <label key={key}>
                  <span>{label}</span>
                  <input type="number" min="0" value={working[key]} onChange={(event) => patch(key, Number(event.target.value))} />
                </label>
              ))}
              <label>
                <span>Độ khó</span>
                <select value={working.difficulty} onChange={(event) => patch("difficulty", event.target.value as Recipe["difficulty"])}>
                  <option>Dễ</option><option>Vừa</option><option>Cầu kỳ</option>
                </select>
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>03</span>
              <div><h3>Kiểm chứng biên tập</h3><p>Không gắn nhãn kiểm chứng khi chưa có người và ngày rà soát.</p></div>
            </div>
            <div className={styles.formGrid}>
              <label>
                <span>Trạng thái nội dung</span>
                <select value={working.editorialStatus} onChange={(event) => patch("editorialStatus", event.target.value as Recipe["editorialStatus"])}>
                  <option>Đã biên tập chi tiết</option><option>Đã chuẩn hóa theo suất</option><option>Đang rà soát</option>
                </select>
              </label>
              <label>
                <span>Trạng thái kiểm chứng</span>
                <select value={working.verificationStatus} onChange={(event) => patch("verificationStatus", event.target.value as VerificationStatus)}>
                  {verificationOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label>
                <span>Người rà soát</span>
                <input value={working.reviewedBy ?? ""} onChange={(event) => patch("reviewedBy", event.target.value || null)} />
              </label>
              <label>
                <span>Ngày rà soát</span>
                <input type="date" value={working.reviewedAt ?? ""} onChange={(event) => patch("reviewedAt", event.target.value || null)} />
              </label>
              <label className={styles.full}>
                <span>Ghi chú kiểm chứng</span>
                <textarea rows={3} value={working.verificationNotes} onChange={(event) => patch("verificationNotes", event.target.value)} />
              </label>
              <label className={styles.full}>
                <span>Nguồn và phạm vi tham chiếu</span>
                <textarea rows={3} value={working.sourceNote} onChange={(event) => patch("sourceNote", event.target.value)} />
              </label>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>04</span>
              <div><h3>Thư viện ảnh</h3><p>Ảnh đúng món phải có tệp riêng; nếu chưa có, giữ nhãn minh họa.</p></div>
            </div>
            <div className={styles.mediaEditor}>
              <div
                className={styles.largePreview}
                style={working.image ? { backgroundImage: `url("${working.image}")` } : undefined}
              >
                {!working.image && <span>Chưa có ảnh đúng món</span>}
              </div>
              <div className={styles.formGrid}>
                <label className={styles.full}>
                  <span>Đường dẫn ảnh</span>
                  <input value={working.image ?? ""} placeholder="/food/ten-mon.webp" onChange={(event) => patch("image", event.target.value || null)} />
                </label>
                <label className={styles.full}>
                  <span>Trạng thái ảnh</span>
                  <select value={working.imageStatus} onChange={(event) => patch("imageStatus", event.target.value as Recipe["imageStatus"])}>
                    <option>Ảnh đúng món</option><option>Minh họa theo nhóm món</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>05</span>
              <div><h3>Nguyên liệu</h3><p>Định lượng, đơn vị, sơ chế và nhóm mua sắm.</p></div>
            </div>
            <div className={styles.repeatList}>
              {working.ingredients.map((item, index) => (
                <article key={`${index}-${item.item}`} className={styles.ingredientRow}>
                  <input aria-label={`Số lượng nguyên liệu ${index + 1}`} value={item.amount} onChange={(event) => updateIngredient(index, { amount: event.target.value })} />
                  <input aria-label={`Đơn vị nguyên liệu ${index + 1}`} value={item.unit} onChange={(event) => updateIngredient(index, { unit: event.target.value })} />
                  <input aria-label={`Tên nguyên liệu ${index + 1}`} value={item.item} onChange={(event) => updateIngredient(index, { item: event.target.value })} />
                  <input aria-label={`Sơ chế nguyên liệu ${index + 1}`} value={item.prep ?? ""} placeholder="Sơ chế" onChange={(event) => updateIngredient(index, { prep: event.target.value || undefined })} />
                  <select aria-label={`Nhóm nguyên liệu ${index + 1}`} value={item.group} onChange={(event) => updateIngredient(index, { group: event.target.value as Recipe["ingredients"][number]["group"] })}>
                    <option>Phần chính</option><option>Gia vị</option><option>Ăn kèm</option>
                  </select>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" checked={item.optional ?? false} onChange={(event) => updateIngredient(index, { optional: event.target.checked })} />
                    Tùy chọn
                  </label>
                  <button
                    className={styles.removeButton}
                    aria-label={`Xóa nguyên liệu ${index + 1}`}
                    onClick={() => patch("ingredients", working.ingredients.filter((_, itemIndex) => itemIndex !== index))}
                  >
                    ×
                  </button>
                </article>
              ))}
              <button
                className={styles.addButton}
                onClick={() => patch("ingredients", [...working.ingredients, { amount: "", unit: "g", item: "", group: "Phần chính" }])}
              >
                + Thêm nguyên liệu
              </button>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>06</span>
              <div><h3>Các bước thực hiện</h3><p>Mỗi bước có thao tác, thời gian và mức nhiệt nếu cần.</p></div>
            </div>
            <div className={styles.repeatList}>
              {working.steps.map((recipeStep, index) => (
                <article key={`${index}-${recipeStep.title}`} className={styles.stepRow}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <input value={recipeStep.title} placeholder="Tên bước" onChange={(event) => updateStep(index, { title: event.target.value })} />
                    <textarea rows={3} value={recipeStep.instruction} placeholder="Hướng dẫn" onChange={(event) => updateStep(index, { instruction: event.target.value })} />
                    <div>
                      <input value={recipeStep.duration ?? ""} placeholder="Thời gian" onChange={(event) => updateStep(index, { duration: event.target.value || undefined })} />
                      <input value={recipeStep.temperature ?? ""} placeholder="Nhiệt độ / mức lửa" onChange={(event) => updateStep(index, { temperature: event.target.value || undefined })} />
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    aria-label={`Xóa bước ${index + 1}`}
                    onClick={() => patch("steps", working.steps.filter((_, stepIndex) => stepIndex !== index))}
                  >
                    ×
                  </button>
                </article>
              ))}
              <button
                className={styles.addButton}
                onClick={() => patch("steps", [...working.steps, { title: "", instruction: "" }])}
              >
                + Thêm bước
              </button>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>07</span>
              <div><h3>Hoàn thiện và an toàn</h3><p>Dấu hiệu đạt, bảo quản và phương án thay thế.</p></div>
            </div>
            <div className={styles.formGrid}>
              <label className={styles.full}><span>Dấu hiệu món đạt</span><textarea rows={3} value={working.doneness} onChange={(event) => patch("doneness", event.target.value)} /></label>
              <label className={styles.full}><span>An toàn thực phẩm</span><textarea rows={3} value={working.safety} onChange={(event) => patch("safety", event.target.value)} /></label>
              <label className={styles.full}><span>Bảo quản</span><textarea rows={3} value={working.storage} onChange={(event) => patch("storage", event.target.value)} /></label>
              <label><span>Dụng cụ · mỗi dòng một mục</span><textarea rows={6} value={working.equipment.join("\n")} onChange={(event) => patch("equipment", lines(event.target.value))} /></label>
              <label><span>Mẹo · mỗi dòng một mục</span><textarea rows={6} value={working.tips.join("\n")} onChange={(event) => patch("tips", lines(event.target.value))} /></label>
              <label><span>Thay thế · mỗi dòng một mục</span><textarea rows={6} value={working.substitutions.join("\n")} onChange={(event) => patch("substitutions", lines(event.target.value))} /></label>
              <label><span>Dị ứng · mỗi dòng một mục</span><textarea rows={6} value={working.allergens.join("\n")} onChange={(event) => patch("allergens", lines(event.target.value))} /></label>
            </div>
          </div>

          <div className={styles.bottomActions}>
            <span>{issues.length === 0 ? "Hồ sơ đủ điều kiện xuất bản." : `${issues.length} cảnh báo cần xử lý.`}</span>
            <button className={styles.secondaryButton} onClick={saveDraft}>Lưu nháp</button>
            <button className={styles.primaryButton} onClick={publishRecipe}>Xuất bản trên thiết bị</button>
          </div>
        </section>
      </section>

      {notice && <div className={styles.notice} role="status">{notice}</div>}
    </main>
  );
}
