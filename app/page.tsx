import { DirectorPostColumns } from "./components/DirectorPostColumns";
import { DirectorSectionCard } from "./components/DirectorSectionCard";
import { AutoRefresh } from "./components/AutoRefresh";
import { adaptDirectorData } from "./data/adaptDirectorData";
import { extractDirectorFooterStats } from "./data/extractDirectorFooterStats";
import { getDirectorScreenData } from "./data/directorApi";
import type { DirectorSection } from "./types/director";

/** Секции «готовая продукция» / «собрано сегодня» — 4-й ряд целиком */
function isFinishedProductSection(s: DirectorSection): boolean {
  const t = s.title.toUpperCase();
  return t.includes("СОБРАНО") || t.includes("ГОТОВАЯ ПРОДУКЦИЯ");
}

export default async function DirectorScreen() {
  let rawData: Awaited<ReturnType<typeof getDirectorScreenData>>;
  try {
    rawData = await getDirectorScreenData();
  } catch {
    const pageBg = "#041221";
    return (
      <div className="h-screen w-screen overflow-hidden text-white p-6 box-border" style={{ backgroundColor: pageBg }}>
        <AutoRefresh />
        <h1 className="sr-only">Экран директора</h1>
        <div className="h-full w-full flex items-center justify-center">
          <div className="rounded-[16px] bg-[#081426] border border-white/10 shadow-[0_0_16px_rgba(0,0,0,0.55)] px-10 py-8 text-center">
            <div className="text-2xl font-semibold">Нет соединения с 1С</div>
            <div className="mt-2 text-white/80">Обновите страницу</div>
          </div>
        </div>
      </div>
    );
  }

  const sections = adaptDirectorData(rawData);
  const pageBg = rawData.color_bg ?? "#041221";
  const footerStats = extractDirectorFooterStats(rawData);

  const postSections = sections.filter((s) => !isFinishedProductSection(s));
  const finishedSections = sections.filter((s) => isFinishedProductSection(s));
  let footerSectionIndex = finishedSections.reduce((acc, s, idx) => {
    const t = s.title.toUpperCase();
    if (t.includes("ГОТОВАЯ")) return idx;
    return acc;
  }, -1);
  if (footerSectionIndex < 0 && finishedSections.length > 0) {
    footerSectionIndex = finishedSections.length - 1;
  }

  return (
    <div className="h-screen w-screen overflow-hidden text-white p-6 box-border" style={{ backgroundColor: pageBg }}>
      <AutoRefresh />
      <h1 className="sr-only">Экран директора</h1>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-0 overflow-hidden min-w-0">
        {/* Колонки 1–3: посты (одна ячейка на 3 колонки, внутри — 3 колонки контента) */}
        <div className="lg:col-span-3 min-w-0 min-h-0 h-full relative overflow-hidden lg:pr-3">
          {/* Линии колонок — всегда полная высота */}
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20 pointer-events-none z-10" aria-hidden />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20 pointer-events-none z-10" aria-hidden />
          <DirectorPostColumns sections={postSections} />
        </div>
        {/* 4-я колонка: готовая продукция (та же ширина, что и 1–3) */}
        <div className="w-full flex flex-col gap-6 overflow-hidden min-h-0 min-w-0 lg:border-l lg:border-white/20 lg:pl-3">
          {finishedSections.map((section, index) => {
            const isFooterTarget = index === footerSectionIndex;
            return (
              <div
                key={`${section.title}-${index}`}
                className={isFooterTarget ? "flex-1 min-h-0" : "shrink-0"}
              >
                <DirectorSectionCard
                  section={section}
                  fillHeight={isFooterTarget}
                  footerStats={isFooterTarget ? footerStats : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
