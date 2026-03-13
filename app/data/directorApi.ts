import type { DirectorScreenDataRoot } from "@/app/types/director";

const DIRECTOR_API_URL =
  process.env.DIRECTOR_API_URL ?? "http://10.0.1.175/Phone/hs/ScreenData/GetInfo";

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

type DirectorApiErrorView = {
  title: string;
  detail: string;
};

function getCauseCode(error: unknown): string | undefined {
  if (!(error instanceof Error) || !("cause" in error)) {
    return undefined;
  }

  const cause = (error as Error & { cause?: unknown }).cause;
  if (!cause || typeof cause !== "object" || !("code" in cause)) {
    return undefined;
  }

  return typeof cause.code === "string" ? cause.code : undefined;
}

function getCauseMessage(error: unknown): string | undefined {
  if (!(error instanceof Error) || !("cause" in error)) {
    return undefined;
  }

  const cause = (error as Error & { cause?: unknown }).cause;
  return cause instanceof Error ? cause.message : undefined;
}

export function getDirectorApiErrorView(error: unknown): DirectorApiErrorView {
  if (error instanceof DirectorApiError) {
    if (error.kind === "http") {
      if (error.status === 401) {
        return {
          title: "Ошибка авторизации в 1С",
          detail: "1С вернула 401 Unauthorized. Проверьте логин, пароль и права HTTP-сервиса.",
        };
      }

      return {
        title: `Ошибка ответа 1С (${error.status ?? "unknown"})`,
        detail: error.message,
      };
    }

    if (error.kind === "json") {
      return {
        title: "1С вернула некорректный JSON",
        detail: "Ответ получен, но его не удалось разобрать как JSON.",
      };
    }

    const code = getCauseCode(error);
    const causeMessage = getCauseMessage(error);

    return {
      title: "Сетевая ошибка при запросе к 1С",
      detail: code ? `${error.message}. Код: ${code}. ${causeMessage ?? ""}`.trim() : error.message,
    };
  }

  if (error instanceof Error) {
    return {
      title: "Ошибка запроса к 1С",
      detail: error.message,
    };
  }

  return {
    title: "Ошибка запроса к 1С",
    detail: "Неизвестная ошибка.",
  };
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
      cache: "no-store",
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

  console.log(data);

  return {
    ...data,
    color_bg: normalizeHexColor(data.color_bg, "#041221"),
    color_lines: normalizeHexColor(data.color_lines, "#3E4B6B"),
  };
}
