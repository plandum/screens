import type { DirectorFooterStats } from "@/app/types/director";

type Scalar = string | number | boolean | null | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseNumberFlexible(value: Scalar): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  // Keep digits and decimal separators, drop spaces, %, and other symbols.
  const normalized = trimmed
    .replace(/\s+/g, "")
    .replace(/%/g, "")
    .replace(/,/g, ".")
    .replace(/[^\d.]+/g, "");

  if (!normalized) return undefined;

  // If multiple dots exist, assume all but last are thousands separators.
  const parts = normalized.split(".");
  const safe =
    parts.length <= 2 ? normalized : `${parts.slice(0, -1).join("")}.${parts.at(-1)}`;

  const num = Number.parseFloat(safe);
  if (!Number.isFinite(num)) return undefined;
  return num;
}

type FlatEntry = { path: string; key: string; value: unknown };

function flattenObject(value: unknown, maxDepth = 4): FlatEntry[] {
  const out: FlatEntry[] = [];
  const seen = new Set<unknown>();

  function walk(node: unknown, path: string, depth: number) {
    if (depth > maxDepth) return;
    if (!isRecord(node)) return;
    if (seen.has(node)) return;
    seen.add(node);

    for (const [key, v] of Object.entries(node)) {
      const nextPath = path ? `${path}.${key}` : key;
      out.push({ path: nextPath, key, value: v });
      if (isRecord(v)) walk(v, nextPath, depth + 1);
    }
  }

  walk(value, "", 0);
  return out;
}

function matchesAny(key: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(key));
}

/**
 * Пытается извлечь «нижний блок» со статистикой из сырого ответа API.
 * Формат полей у API может отличаться, поэтому используем эвристики по именам ключей.
 */
export function extractDirectorFooterStats(rawData: unknown): DirectorFooterStats {
  if (!isRecord(rawData)) return {};

  const entries = flattenObject(rawData);

  const planKeyPatterns = [/^plan$/i, /plan_/i, /_plan/i, /план/i];
  const doneKeyPatterns = [/done/i, /completed/i, /fact/i, /actual/i, /выполн/i, /сделан/i];
  const dayKeyPatterns = [/day/i, /today/i, /сегодня/i, /день/i, /сутк/i];
  const monthKeyPatterns = [/month/i, /месяц/i, /мес/i];
  const percentKeyPatterns = [/percent/i, /pct/i, /процент/i, /%/];

  const stats: DirectorFooterStats = {};

  // First pass: extract explicit percent/plan/done fields.
  for (const { path, value } of entries) {
    const fullKey = `${path}`.toLowerCase();
    const scalar = isRecord(value) || Array.isArray(value) ? undefined : (value as Scalar);

    if (scalar === undefined) continue;

    const num = parseNumberFlexible(scalar);
    if (num === undefined) continue;

    const isPercent = matchesAny(fullKey, percentKeyPatterns);
    const isPlan = matchesAny(fullKey, planKeyPatterns);
    const isDone = matchesAny(fullKey, doneKeyPatterns);
    const isDay = matchesAny(fullKey, dayKeyPatterns);
    const isMonth = matchesAny(fullKey, monthKeyPatterns);

    if (isPlan && stats.plan === undefined && !isPercent) {
      stats.plan = num;
      continue;
    }

    if (isPercent && isDay && stats.doneDayPercent === undefined) {
      stats.doneDayPercent = num;
      continue;
    }

    if (isPercent && isMonth && stats.doneMonthPercent === undefined) {
      stats.doneMonthPercent = num;
      continue;
    }

    if (!isPercent && isDone && isDay && stats.doneDay === undefined) {
      stats.doneDay = num;
      continue;
    }

    if (!isPercent && isDone && isMonth && stats.doneMonth === undefined) {
      stats.doneMonth = num;
      continue;
    }
  }

  // Second pass: if "done" exists without day/month qualifier, map by priority.
  if (stats.doneDay === undefined || stats.doneMonth === undefined) {
    const genericDone = entries
      .filter(({ path, value }) => {
        const k = path.toLowerCase();
        if (!matchesAny(k, doneKeyPatterns)) return false;
        if (matchesAny(k, percentKeyPatterns)) return false;
        if (matchesAny(k, planKeyPatterns)) return false;
        return !isRecord(value) && !Array.isArray(value);
      })
      .map(({ path, value }) => ({ path, num: parseNumberFlexible(value as Scalar) }))
      .filter((x): x is { path: string; num: number } => x.num !== undefined);

    for (const { path, num } of genericDone) {
      const k = path.toLowerCase();
      if (stats.doneMonth === undefined && matchesAny(k, monthKeyPatterns)) {
        stats.doneMonth = num;
      } else if (stats.doneDay === undefined && matchesAny(k, dayKeyPatterns)) {
        stats.doneDay = num;
      }
    }
  }

  // Derive percentages if missing and plan is present.
  if (stats.plan && stats.plan > 0) {
    if (stats.doneMonth !== undefined && stats.doneMonthPercent === undefined) {
      stats.doneMonthPercent = (stats.doneMonth / stats.plan) * 100;
    }
    if (stats.doneDay !== undefined && stats.doneDayPercent === undefined) {
      stats.doneDayPercent = (stats.doneDay / stats.plan) * 100;
    }
  }

  return stats;
}
