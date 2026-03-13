import { AutoRefresh } from "./AutoRefresh";
import { getDirectorApiErrorView } from "../data/directorApi";

type DirectorApiErrorStateProps = {
  error: unknown;
};

export function DirectorApiErrorState({ error }: DirectorApiErrorStateProps) {
  const pageBg = "#041221";
  const view = getDirectorApiErrorView(error);

  return (
    <div
      className="h-screen w-screen overflow-hidden p-6 text-white box-border"
      style={{ backgroundColor: pageBg }}
    >
      <AutoRefresh />
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-[560px] rounded-[16px] border border-white/10 bg-[#081426] px-10 py-8 text-center shadow-[0_0_16px_rgba(0,0,0,0.55)]">
          <div className="text-2xl font-semibold">{view.title}</div>
          <div className="mt-3 text-base text-white/80">{view.detail}</div>
          <div className="mt-3 text-sm text-white/60">Обновите страницу после восстановления 1С.</div>
        </div>
      </div>
    </div>
  );
}
