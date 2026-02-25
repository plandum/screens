import type { DirectorScreenDataRoot } from "@/app/types/director";

const DIRECTOR_API_URL = "http://10.0.1.175/Phone/hs/ScreenData/GetInfo";

// TODO: Вставьте сюда ваш base64 для Basic auth (без префикса "Basic ").
const DIRECTOR_API_BASIC_AUTH_BASE64 = "c2E6MTY3OTYxNjE2Nzk2MTY=";

function normalizeHexColor(color: unknown, fallback: string): string {
  if (typeof color !== "string" || color.length === 0) {
    return fallback;
  }

  return color.startsWith("#") ? color : `#${color}`;
}

export async function getDirectorScreenData(): Promise<DirectorScreenDataRoot> {
  const response = await fetch(DIRECTOR_API_URL, {
    method: "GET",
    headers: {
      Authorization: `Basic ${DIRECTOR_API_BASIC_AUTH_BASE64}`,
      Accept: "application/json",
    },
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`Director API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as DirectorScreenDataRoot;

  return {
    ...data,
    color_bg: normalizeHexColor(data.color_bg, "#041221"),
    color_lines: normalizeHexColor(data.color_lines, "#3E4B6B"),
  };
}
