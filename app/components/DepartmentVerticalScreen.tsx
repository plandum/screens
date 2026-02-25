 "use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DirectorItem, DirectorSection } from "@/app/types/director";

const golosStyle = {
  fontFamily: '"Golos Text", system-ui, sans-serif',
  letterSpacing: 0,
} as const;
const MAX_VISIBLE_ROWS = 8;
const ROW_HEIGHT_PX = 70;
const SLIDE_INTERVAL_MS = 5000;
const TOP_HEADER_HEIGHT_PX = 102; // pt-6 + line-height 62 + pb-4
const STATUS_TITLE_BLOCK_PX = 84; // mt-4 + h-60 + mb-2

function distributeVisibleRows(
  counts: number[],
  budget: number,
  baseRows: number
): number[] {
  const initialCap = Math.min(baseRows, budget);
  const allocation = counts.map((count) => Math.min(count, initialCap));
  let spare = budget - allocation.reduce((sum, rows) => sum + rows, 0);

  while (spare > 0) {
    const needyIndexes = allocation
      .map((rows, idx) => (rows < counts[idx] ? idx : -1))
      .filter((idx) => idx >= 0);

    if (needyIndexes.length === 0) break;

    for (const idx of needyIndexes) {
      if (spare === 0) break;
      allocation[idx] += 1;
      spare -= 1;
    }
  }

  return allocation;
}

function statusTotal(section: DirectorSection): number {
  return (
    section.data_waiting.length +
    section.data_started.length +
    section.data_finished.length
  );
}

function formatDate(date: string): string {
  return date
    .replace(/дн\./g, "д")
    .replace(/ч\./g, "ч")
    .replace(/мин\./g, "мин")
    .replace(/\s+/g, " ")
    .trim();
}

function splitDateColumns(date: string): { middle: string; right: string } {
  const normalized = formatDate(date);

  const hourColonMinMatch = normalized.match(/^(\d+)\s*ч:(\d{1,2})$/);
  if (hourColonMinMatch) {
    const hours = Number.parseInt(hourColonMinMatch[1], 10);
    const mins = Number.parseInt(hourColonMinMatch[2], 10);
    if (hours === 0) {
      return { middle: "", right: `${mins} м` };
    }
    return { middle: "", right: `${hours}:${hourColonMinMatch[2].padStart(2, "0")}` };
  }

  const timeMatch = normalized.match(/(.*)\s(\d{1,2}:\d{2})$/);
  if (timeMatch) {
    return { middle: timeMatch[1].trim(), right: timeMatch[2] };
  }

  const dhMatch = normalized.match(/^(\d+)\s*д\s*(\d+)\s*ч$/i);
  if (dhMatch) {
    return { middle: "", right: `${dhMatch[2]} ч` };
  }

  const hmMatch = normalized.match(/^(\d+)\s*ч\s*(\d+)\s*мин\.?$/i);
  if (hmMatch) {
    return { middle: "", right: `${hmMatch[1]}:${hmMatch[2].padStart(2, "0")}` };
  }

  return { middle: normalized, right: "" };
}

function SectionHeader({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <header className="flex items-center justify-between px-7 pt-6 pb-4">
      <h1
        className="uppercase text-[#F0F5FF]"
        style={{ ...golosStyle, fontWeight: 500, fontSize: 58, lineHeight: "62px" }}
      >
        {title}
      </h1>
      <span
        className="tabular-nums text-[#F0F5FF]"
        style={{ ...golosStyle, fontWeight: 500, fontSize: 58, lineHeight: "62px" }}
      >
        {value}
      </span>
    </header>
  );
}

function StatusTitle({
  label,
  color,
  bg,
  pagination,
}: {
  label: string;
  color: string;
  bg: string;
  pagination?: string;
}) {
  return (
    <div
      className="mx-7 mt-4 mb-2 h-[60px] rounded-[14px] px-3 flex items-center gap-4"
      style={{ backgroundColor: bg }}
    >
      <span
        className="w-9 h-9 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span
        className="uppercase"
        style={{ ...golosStyle, fontWeight: 600, fontSize: 44, lineHeight: "46px", color: "#F0F5FF" }}
      >
        {label}
      </span>
      <span className="ml-auto" style={{ ...golosStyle, fontWeight: 600, fontSize: 44, lineHeight: "46px", color: "#F0F5FF" }}>
        {pagination}
      </span>
    </div>
  );
}

function ItemRow({ item, accent }: { item: DirectorItem; accent: string }) {
  const date = splitDateColumns(item.date);

  return (
    <div className="h-[70px] box-border mx-7 px-1 border-b border-[#365069] flex items-center gap-4">
      <span
        className="w-[8px] h-[48px] rounded-[6px] shrink-0"
        style={{ backgroundColor: accent }}
      />
      <span
        className="w-[390px] truncate text-[#F1F5FF]"
        style={{ ...golosStyle, fontWeight: 400, fontSize: 30, lineHeight: "32px" }}
      >
        {item.vin}
      </span>
      <span
        className="w-[270px] truncate text-[#AFC2D6]"
        style={{ ...golosStyle, fontWeight: 400, fontSize: 20, lineHeight: "22px" }}
      >
        {item.order_number || "—"}
      </span>
      <span
        className="flex-1 truncate text-[#AFC2D6]"
        style={{ ...golosStyle, fontWeight: 400, fontSize: 37, lineHeight: "40px" }}
      >
        {date.middle}
      </span>
      <span
        className="w-[145px] text-right tabular-nums whitespace-nowrap"
        style={{ ...golosStyle, fontWeight: 400, fontSize: 38, lineHeight: "40px", color: accent, textAlign: "right" }}
      >
        {date.right}
      </span>
    </div>
  );
}

function StatusBlock({
  label,
  headerBg,
  accent,
  items,
  visibleRows,
}: {
  label: string;
  headerBg: string;
  accent: string;
  items: DirectorItem[];
  visibleRows: number;
}) {
  const rows = Math.max(0, visibleRows);
  const pages = useMemo(() => {
    if (rows <= 0 || items.length === 0) return [] as DirectorItem[][];
    const result: DirectorItem[][] = [];
    for (let i = 0; i < items.length; i += rows) {
      result.push(items.slice(i, i + rows));
    }
    return result;
  }, [items, rows]);
  const shouldSlide = pages.length > 1;
  const [activePage, setActivePage] = useState(0);
  const safeActivePage = pages.length > 0 ? activePage % pages.length : 0;
  const pagination = pages.length > 1 ? `${safeActivePage + 1}/${pages.length}` : undefined;

  useEffect(() => {
    if (!shouldSlide) return;
    const timer = window.setInterval(() => {
      setActivePage((prev) => (prev + 1) % pages.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [pages.length, shouldSlide]);

    return (
    <section>
      <StatusTitle label={label} color={accent} bg={headerBg} pagination={pagination} />
      <div className={shouldSlide ? "overflow-hidden" : undefined} style={rows > 0 ? { height: `${rows * ROW_HEIGHT_PX}px` } : undefined}>
        <div
          className={shouldSlide ? "flex transition-transform duration-500 ease-in-out" : undefined}
          style={
            shouldSlide
              ? {
                  width: `${pages.length * 100}%`,
                  transform: `translateX(-${(safeActivePage * 100) / pages.length}%)`,
                }
              : undefined
          }
        >
          {(shouldSlide ? pages : [pages[0] ?? items]).map((pageItems, pageIdx) => (
            <div
              key={`${label}-page-${pageIdx}`}
              style={shouldSlide ? { width: `${100 / pages.length}%` } : undefined}
            >
              {pageItems.map((item, idx) => (
                <ItemRow key={`${label}-${pageIdx}-${idx}-${item.vin}-${item.order_number}-${item.date}`} item={item} accent={accent} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DepartmentVerticalScreen({ section, pageBg }: { section: DirectorSection; pageBg: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasHeight, setCanvasHeight] = useState(0);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const update = () => setCanvasHeight(el.clientHeight);
    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalRowsBudget = useMemo(() => {
    if (canvasHeight <= 0) return MAX_VISIBLE_ROWS * 3;
    const chrome = TOP_HEADER_HEIGHT_PX + STATUS_TITLE_BLOCK_PX * 3;
    return Math.max(0, Math.floor((canvasHeight - chrome) / ROW_HEIGHT_PX));
  }, [canvasHeight]);

  const [waitingRows, startedRows, finishedRows] = useMemo(
    () =>
      distributeVisibleRows(
        [
          section.data_waiting.length,
          section.data_started.length,
          section.data_finished.length,
        ],
        totalRowsBudget,
        MAX_VISIBLE_ROWS
      ),
    [section.data_waiting.length, section.data_started.length, section.data_finished.length, totalRowsBudget]
  );

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: pageBg }}>
      <div
        ref={canvasRef}
        className="overflow-hidden"
        style={{
          width: "min(100vw, 56.25vh)",
          height: "min(177.7778vw, 100vh)",
          backgroundColor: pageBg,
        }}
      >
        <SectionHeader title={section.title} value={statusTotal(section)} />

        <StatusBlock
          label="Ожидается"
          headerBg="#B76000"
          accent="#FF9A2A"
          items={section.data_waiting}
          visibleRows={waitingRows}
        />

        <StatusBlock
          label="В работе"
          headerBg="#215AA7"
          accent="#5DC7FF"
          items={section.data_started}
          visibleRows={startedRows}
        />

        <StatusBlock
          label="Готово"
          headerBg="#0A7A3A"
          accent="#3BEA3E"
          items={section.data_finished}
          visibleRows={finishedRows}
        />
      </div>
    </div>
  );
}
