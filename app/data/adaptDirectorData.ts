import type { DirectorSection, DirectorSectionRaw, DirectorScreenDataRoot } from "@/app/types/director";

const DEFAULT_ORDER_COLOR = "#92A2E3";
const DEFAULT_VIN_COLOR = "#FFFFFF";

function isTabsRoot(data: unknown): data is DirectorScreenDataRoot {
  return (
    typeof data === "object" &&
    data !== null &&
    "tab_1" in data &&
    typeof (data as Record<string, unknown>).tab_1 === "object"
  );
}

/** Из корневого объекта с tab_1, tab_2, ... собирает массив секций в порядке табов. */
export function adaptDirectorData(data: unknown): DirectorSection[] {
  if (isTabsRoot(data)) {
    const keys = Object.keys(data).filter((k) => /^tab_\d+$/.test(k));
    keys.sort((a, b) => {
      const n1 = parseInt(a.replace("tab_", ""), 10);
      const n2 = parseInt(b.replace("tab_", ""), 10);
      return n1 - n2;
    });
    return keys.map((key) => {
      const raw = (data as Record<string, DirectorSectionRaw>)[key];
      return rawToSection(raw);
    });
  }
  if (Array.isArray(data)) {
    return (data as DirectorSectionRaw[]).map((s) => rawToSection(s));
  }
  return [];
}

function rawToSection(raw: DirectorSectionRaw): DirectorSection {
  const data_waiting = Array.isArray(raw.data_waiting) ? raw.data_waiting : [];
  const data_started = Array.isArray(raw.data_started) ? raw.data_started : [];
  const data_finished = Array.isArray(raw.data_finished) ? raw.data_finished : [];
  const firstItem =
    data_waiting[0] ?? data_started[0] ?? data_finished[0];

  return {
    ...raw,
    data_waiting,
    data_started,
    data_finished,
    order_color: firstItem?.color_order_number ?? DEFAULT_ORDER_COLOR,
    vin_color: firstItem?.color_vin_font ?? DEFAULT_VIN_COLOR,
  };
}
