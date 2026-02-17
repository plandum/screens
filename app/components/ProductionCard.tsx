"use client";

import type { ProductionCardData, ProductionItem } from "@/app/types/director";

const variantStyles = {
  plasma: {
    headerBg: "bg-[#1e3a5f]",
    barColor: "bg-[#e85d04]",
    iconBg: "bg-[#2563eb]",
  },
  finished: {
    headerBg: "bg-[#14532d]",
    barColor: "bg-[#22c55e]",
    iconBg: "bg-[#16a34a]",
  },
};

function ItemRow({ item, barColor }: { item: ProductionItem; barColor: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
      <div className={`w-1 shrink-0 self-stretch min-h-8 rounded-full ${barColor}`} />
      <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-white font-medium text-sm truncate">{item.id}</span>
        <span className="text-white/90 text-sm truncate">{item.code}</span>
      </div>
      <span className="text-[#e85d04] font-semibold text-sm shrink-0 tabular-nums">
        {item.time}
      </span>
    </div>
  );
}

export function ProductionCard({ variant, title, count, items }: ProductionCardData) {
  const styles = variantStyles[variant];

  return (
    <article className="rounded-lg overflow-hidden bg-[#0f172a] border border-white/10 shadow-xl">
      <header
        className={`${styles.headerBg} flex items-center gap-3 px-4 py-3`}
      >
        <div className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center shrink-0`}>
          <span className="text-white text-lg font-bold">
            {variant === "plasma" ? "П" : "Г"}
          </span>
        </div>
        <h2 className="text-white font-semibold text-lg flex-1 truncate">
          {title}
        </h2>
        {count != null && (
          <span className="text-white font-bold text-xl tabular-nums">
            {count}
          </span>
        )}
      </header>
      <div className="px-4 py-3">
        {items.map((item) => (
          <ItemRow key={`${item.id}-${item.code}`} item={item} barColor={styles.barColor} />
        ))}
      </div>
    </article>
  );
}
