import type { DirectorScreenDataRoot } from "@/app/types/director";

const DIRECTOR_API_URL =
  process.env.DIRECTOR_API_URL ?? "http://10.0.1.175/Phone/hs/ScreenData/GetInfo";

// TODO: Вставьте сюда ваш base64 для Basic auth (без префикса "Basic ").
const DIRECTOR_API_BASIC_AUTH_BASE64 =
  process.env.DIRECTOR_API_BASIC_AUTH_BASE64 ?? "c2E6MTY3OTYxNjE2Nzk2MTY=";

export class DirectorApiError extends Error {
  public readonly kind: "network" | "http" | "json";
  public readonly status?: number;

  constructor(
    kind: "network" | "http" | "json",
    message: string,
    opts?: { status?: number; cause?: unknown }
  ) {
    super(message, { cause: opts?.cause });
    this.name = "DirectorApiError";
    this.kind = kind;
    this.status = opts?.status;
  }
}

function normalizeHexColor(color: unknown, fallback: string): string {
  if (typeof color !== "string" || color.length === 0) {
    return fallback;
  }

  return color.startsWith("#") ? color : `#${color}`;
}

export async function getDirectorScreenData(): Promise<DirectorScreenDataRoot> {
  let response: Response;
  try {
    response = await fetch(DIRECTOR_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Basic ${DIRECTOR_API_BASIC_AUTH_BASE64}`,
        Accept: "application/json",
      },
      next: { revalidate: 600 },
    });
  } catch (err) {
    throw new DirectorApiError("network", "Director API fetch failed", { cause: err });
  }

  if (!response.ok) {
    throw new DirectorApiError(
      "http",
      `Director API request failed with status ${response.status}`,
      { status: response.status }
    );
  }

  let data: DirectorScreenDataRoot;
  try {
    data = (await response.json()) as DirectorScreenDataRoot;
  } catch (err) {
    throw new DirectorApiError("json", "Director API returned invalid JSON", { cause: err });
  }

  return {
    ...data,
    color_bg: normalizeHexColor(data.color_bg, "#041221"),
    color_lines: normalizeHexColor(data.color_lines, "#3E4B6B"),
  };
}
