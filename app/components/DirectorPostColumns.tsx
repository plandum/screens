"use client";

import { useEffect, useRef, useState } from "react";
import { DirectorSectionCard } from "./DirectorSectionCard";
import type { DirectorSection } from "@/app/types/director";

const ROW_HEIGHT_PX = 50;
const CARD_HEADER_HEIGHT_PX = 44;
const CARD_PADDING_PX = 20;
const CARD_MARGIN_BOTTOM_PX = 24; // mb-6

const NUM_COLUMNS = 3;

function totalItems(s: DirectorSection): number {
  return s.data_waiting.length + s.data_started.length + s.data_finished.length;
}

function blockHeight(section: DirectorSection): number {
  const hasHeader = section.title.trim() !== "";
  const rows = totalItems(section);
  return (
    (hasHeader ? CARD_HEADER_HEIGHT_PX + CARD_PADDING_PX : 8) +
    rows * ROW_HEIGHT_PX +
    CARD_MARGIN_BOTTOM_PX
  );
}

/** Берём из секции до needRows элементов; возвращаем [взятое, остаток]. */
function takeUpTo(
  section: DirectorSection,
  needRows: number
): { taken: DirectorSection; rest: DirectorSection | null } {
  const w = section.data_waiting;
  const s = section.data_started;
  const f = section.data_finished;

  let takeW = Math.min(w.length, needRows);
  let takeS = 0;
  let takeF = 0;
  let taken = takeW;
  if (taken < needRows) {
    takeS = Math.min(s.length, needRows - taken);
    taken += takeS;
  }
  if (taken < needRows) {
    takeF = Math.min(f.length, needRows - taken);
  }

  const restW = w.slice(takeW);
  const restS = s.slice(takeS);
  const restF = f.slice(takeF);
  const hasRest = restW.length > 0 || restS.length > 0 || restF.length > 0;

  const takenSection: DirectorSection = {
    ...section,
    data_waiting: w.slice(0, takeW),
    data_started: s.slice(0, takeS),
    data_finished: f.slice(0, takeF),
  };
  const restSection: DirectorSection | null = hasRest
    ? { ...section, title: "", data_waiting: restW, data_started: restS, data_finished: restF }
    : null;

  return { taken: takenSection, rest: restSection };
}

/** Сколько строк влезает в данную высоту (с учётом шапки, если есть). */
function rowsThatFit(spacePx: number, hasHeader: boolean): number {
  if (spacePx <= 0) return 0;
  const forRows = hasHeader
    ? spacePx - CARD_HEADER_HEIGHT_PX - CARD_PADDING_PX - CARD_MARGIN_BOTTOM_PX
    : spacePx - 8 - CARD_MARGIN_BOTTOM_PX;
  return Math.max(0, Math.floor(forRows / ROW_HEIGHT_PX));
}

/**
 * Раскладка по трём колонкам: в текущую колонку кладём только то, что влезает
 * в оставшуюся высоту, остаток уходит в следующую колонку (как у СБОРКА В СТАПЕЛЕ).
 */
function packColumns(
  sections: DirectorSection[],
  columnHeight: number
): DirectorSection[][] {
  const columns: DirectorSection[][] = [[], [], []];
  const remaining = [columnHeight, columnHeight, columnHeight];

  for (const section of sections) {
    let current: DirectorSection | null = { ...section };
    let col = 0;
    const totalInSection = totalItems(section);
    let isFirstBlock = true;

    while (current && totalItems(current) > 0 && col < NUM_COLUMNS) {
      const space = remaining[col];
      const hasHeader = current.title.trim() !== "";
      const needRows = rowsThatFit(space, hasHeader);

      if (needRows <= 0) {
        col++;
        continue;
      }

      const n = totalItems(current);
      if (n <= needRows) {
        const block = isFirstBlock
          ? { ...current, displayTotalCount: totalInSection }
          : current;
        columns[col].push(block);
        remaining[col] -= blockHeight(block);
        current = null; // всё разместили — не пушить в lastCol
        break;
      }

      const { taken, rest } = takeUpTo(current, needRows);
      const block = isFirstBlock
        ? { ...taken, displayTotalCount: totalInSection }
        : taken;
      columns[col].push(block);
      remaining[col] -= blockHeight(block);
      current = rest;
      if (current) current = { ...current, title: "" };
      isFirstBlock = false;
      col++;
    }

    if (current && totalItems(current) > 0) {
      const lastCol = NUM_COLUMNS - 1;
      columns[lastCol].push(current);
      remaining[lastCol] -= blockHeight(current);
    }
  }

  return columns;
}

export function DirectorPostColumns({ sections }: { sections: DirectorSection[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry?.contentBoxSize) {
        const blockSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0].blockSize
          : entry.contentBoxSize.blockSize;
        setContainerHeight(blockSize ?? el.clientHeight);
      } else {
        setContainerHeight(el.clientHeight);
      }
    });

    observer.observe(el);
    setContainerHeight(el.clientHeight);
    return () => observer.disconnect();
  }, []);

  const columnBlocks =
    containerHeight !== null ? packColumns(sections, containerHeight) : null;

  return (
    <div
      ref={containerRef}
      className="h-full min-h-0 flex gap-x-6 overflow-hidden"
    >
      {columnBlocks === null ? (
        <>
          <div className="flex-1 min-w-0" />
          <div className="flex-1 min-w-0" />
          <div className="flex-1 min-w-0" />
        </>
      ) : (
        columnBlocks.map((blocks, colIndex) => (
          <div
            key={colIndex}
            className="flex-1 min-w-0 flex flex-col overflow-hidden"
          >
            {blocks.map((section, blockIndex) => (
              <div
                key={`${colIndex}-${blockIndex}-${section.title || "c"}`}
                className="mb-6 shrink-0"
              >
                <DirectorSectionCard section={section} />
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
