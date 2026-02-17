import { DirectorPostColumns } from "./components/DirectorPostColumns";
import { DirectorSectionCard } from "./components/DirectorSectionCard";
import { adaptDirectorData } from "./data/adaptDirectorData";
import type { DirectorSection } from "./types/director";

import rawData from "../test.json";

const sections = adaptDirectorData(rawData);
const pageBg =
  typeof rawData === "object" && rawData !== null && "color_bg" in rawData
    ? (rawData as { color_bg?: string }).color_bg
    : "#041221";

/** Секции «готовая продукция» / «собрано сегодня» — 4-й ряд целиком */
function isFinishedProductSection(s: DirectorSection): boolean {
  const t = s.title.toUpperCase();
  return t.includes("СОБРАНО") || t.includes("ГОТОВАЯ ПРОДУКЦИЯ");
}

export default function DirectorScreen() {
  const postSections = sections.filter((s) => !isFinishedProductSection(s));
  const finishedSections = sections.filter((s) => isFinishedProductSection(s));

  return (
    <div className="h-screen w-screen overflow-hidden text-white p-6 box-border" style={{ backgroundColor: pageBg }}>
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
          {finishedSections.map((section, index) => (
            <DirectorSectionCard key={`${section.title}-${index}`} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
