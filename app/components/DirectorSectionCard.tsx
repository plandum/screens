"use client";

import type { DirectorItem, DirectorSection } from "@/app/types/director";
import type { DirectorFooterStats } from "@/app/types/director";

function hexToStyle(hex: string, prefix = "#") {
  const value = hex.startsWith("#") ? hex : `${prefix}${hex}`;
  return value;
}

const golosStyle = {
  fontFamily: '"Golos Text", system-ui, sans-serif',
  fontWeight: 500,
  letterSpacing: 0,
} as const;

/** дн. → д, ч. → ч, "N ч. M мин." → "N:M" */
function formatDate(dateStr: string): string {
  let s = dateStr.replace(/дн\./g, "д").replace(/ч\./g, "ч");

  const hourColonMinMatch = s.match(/^(\d+)\s*ч:(\d{1,2})$/);
  if (hourColonMinMatch) {
    const hours = Number.parseInt(hourColonMinMatch[1], 10);
    const mins = Number.parseInt(hourColonMinMatch[2], 10);
    if (hours === 0) return `${mins} м`;
    return `${hours}:${hourColonMinMatch[2].padStart(2, "0")}`;
  }

  const match = s.match(/^(\d+)\s*ч\s*(\d+)\s*мин\.?$/);
  if (match) {
    const mins = match[2].padStart(2, "0");
    s = `${match[1]}:${mins}`;
  }
  return s;
}

function ItemRow({
  item,
  vinColor,
}: {
  item: DirectorItem;
  vinColor: string;
}) {
  const barColor = hexToStyle(item.color_box);
  const dateColor = hexToStyle(item.color_date);

  return (
    <div className="flex items-center h-[50px] pl-[10px] pr-3 bg-[#050f1f] border-t border-[#49667E] last:border-b last:border-[#49667E]">
      <div
        className="w-[10px] h-[36px] mr-3 shrink-0 rounded-sm"
        style={{ backgroundColor: barColor }}
      />
      <div className="w-[200px] shrink-0">
        <span
          className="truncate block"
          style={{
            ...golosStyle,
            color: hexToStyle(item.color_vin_font ?? vinColor),
            fontSize: 16,
            lineHeight: "18px",
          }}
        >
          {item.vin}
        </span>
      </div>
      <div className="flex-1 min-w-0 h-[36px] flex items-center px-2">
        <span
          className="truncate block"
          style={{
            fontFamily: '"Golos Text", system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: "17px",
            letterSpacing: 0,
            color: hexToStyle(item.color_order_number ?? "#B3C3D2"),
          }}
        >
          {item.order_number || "—"}
        </span>
      </div>
      <span
        className="shrink-0 tabular-nums min-w-[60px] text-right whitespace-nowrap"
        style={{
          ...golosStyle,
          color: dateColor,
          fontSize: 20,
          lineHeight: "18px",
        }}
      >
        {formatDate(item.date)}
      </span>
    </div>
  );
}

function ItemList({
  items,
  sectionVinColor,
}: {
  items: DirectorItem[];
  sectionVinColor: string;
}) {
  if (items.length === 0) return null;
  return (
    <>
      {items.map((item) => (
        <ItemRow key={item.vin} item={item} vinColor={sectionVinColor} />
      ))}
    </>
  );
}

function formatPercent(value?: number): string {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return `${value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

function formatCount(value?: number): string {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("ru-RU");
}

function FooterStats({ stats }: { stats: DirectorFooterStats }) {
  return (
    <footer className="px-4 pb-4">
      <div className="rounded-[12px] bg-[#263b2e] px-6 py-5 shadow-[0_0_12px_rgba(0,0,0,0.35)]">
        <div className="flex items-baseline gap-4">
          <span style={{ ...golosStyle, fontSize: 18, lineHeight: "22px", color: "#E6EEF6" }}>
            Выполнено за день
          </span>
          <span className="ml-auto tabular-nums whitespace-nowrap" style={{ ...golosStyle, fontSize: 22, lineHeight: "24px", color: "#FF8A00" }}>
            {formatPercent(stats.doneDayPercent)}
          </span>
          <span className="tabular-nums whitespace-nowrap" style={{ ...golosStyle, fontSize: 22, lineHeight: "24px", color: "#E6EEF6" }}>
            {formatCount(stats.doneDay)}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-4">
          <span style={{ ...golosStyle, fontSize: 18, lineHeight: "22px", color: "#E6EEF6" }}>
            Выполнено за месяц
          </span>
          <span className="ml-auto tabular-nums whitespace-nowrap" style={{ ...golosStyle, fontSize: 22, lineHeight: "24px", color: "#B7F71C" }}>
            {formatPercent(stats.doneMonthPercent)}
          </span>
          <span className="tabular-nums whitespace-nowrap" style={{ ...golosStyle, fontSize: 22, lineHeight: "24px", color: "#E6EEF6" }}>
            {formatCount(stats.doneMonth)}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-4">
          <span style={{ ...golosStyle, fontSize: 18, lineHeight: "22px", color: "#E6EEF6" }}>
            План
          </span>
          <span className="ml-auto tabular-nums whitespace-nowrap" style={{ ...golosStyle, fontSize: 22, lineHeight: "24px", color: "#E6EEF6" }}>
            {formatCount(stats.plan)}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function DirectorSectionCard({
  section,
  fillHeight = false,
  footerStats,
}: {
  section: DirectorSection;
  fillHeight?: boolean;
  footerStats?: DirectorFooterStats;
}) {
  const noHeader = !section.title || section.title.trim() === "";
  const isReadyProduct = section.title.toUpperCase().includes("СОБРАНО СЕГОДНЯ");
  const headerBg = isReadyProduct
    ? "#047035"
    : hexToStyle(section.color_title_bg ?? "#1351A1");
  const totalCount =
    section.displayTotalCount ??
    section.data_waiting.length +
      section.data_started.length +
      section.data_finished.length;

  return (
    <article
      className={
        fillHeight
          ? "rounded-[8px] overflow-hidden bg-[#020814] border border-[#111827] shadow-[0_0_12px_rgba(0,0,0,0.6)] flex flex-col h-full min-h-0"
          : "rounded-[8px] overflow-hidden bg-[#020814] border border-[#111827] shadow-[0_0_12px_rgba(0,0,0,0.6)]"
      }
    >
      {!noHeader && (
        <header
          className="flex items-center gap-3 px-4 h-11"
          style={{ backgroundColor: headerBg }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: hexToStyle(section.order_color ?? "#92A2E3") }}
            />
          </div>
          <h2
            className="text-white flex-1 truncate"
            style={{ ...golosStyle, fontSize: 24, lineHeight: "28px" }}
          >
            {section.title}
          </h2>
          {totalCount > 0 && (
            <span
              className="text-white tabular-nums"
              style={{ ...golosStyle, fontSize: 24, lineHeight: "28px" }}
            >
              {totalCount}
            </span>
          )}
        </header>
      )}
      <div className={fillHeight ? "flex-1 min-h-0" : undefined}>
        <div className={`${noHeader ? "pt-1 pb-1" : "py-1"} bg-[#020814]${fillHeight ? " overflow-auto" : ""}`}>
          <ItemList items={section.data_waiting} sectionVinColor={section.vin_color ?? "#FFFFFF"} />
          <ItemList items={section.data_started} sectionVinColor={section.vin_color ?? "#FFFFFF"} />
          <ItemList items={section.data_finished} sectionVinColor={section.vin_color ?? "#FFFFFF"} />
        </div>
      </div>
      {footerStats ? <FooterStats stats={footerStats} /> : null}
    </article>
  );
}
