import { notFound } from "next/navigation";
import { AutoRefresh } from "@/app/components/AutoRefresh";
import { DepartmentVerticalScreen } from "@/app/components/DepartmentVerticalScreen";
import { adaptDirectorData } from "@/app/data/adaptDirectorData";
import { getDirectorScreenData } from "@/app/data/directorApi";

type PageProps = {
  params: Promise<{ tab: string }>;
};

function getScreenBg(rawBg: unknown): string {
  if (typeof rawBg !== "string" || rawBg.length === 0) {
    return "#001A37";
  }
  return rawBg.startsWith("#") ? rawBg : `#${rawBg}`;
}

export default async function DepartmentByTabPage({ params }: PageProps) {
  const { tab } = await params;
  const tabNumber = Number.parseInt(tab, 10);

  if (Number.isNaN(tabNumber) || tabNumber < 1) {
    notFound();
  }

  let rawData: Awaited<ReturnType<typeof getDirectorScreenData>>;
  try {
    rawData = await getDirectorScreenData();
  } catch {
    const pageBg = "#041221";
    return (
      <div className="h-screen w-screen overflow-hidden text-white p-6 box-border" style={{ backgroundColor: pageBg }}>
        <AutoRefresh />
        <div className="h-full w-full flex items-center justify-center">
          <div className="rounded-[16px] bg-[#081426] border border-white/10 shadow-[0_0_16px_rgba(0,0,0,0.55)] px-10 py-8 text-center">
            <div className="text-2xl font-semibold">Нет соединения с 1С</div>
            <div className="mt-2 text-white/80">Обновите страницу</div>
          </div>
        </div>
      </div>
    );
  }
  const sections = adaptDirectorData(rawData);
  const section = sections[tabNumber - 1];

  if (!section) {
    notFound();
  }

  const pageBg = getScreenBg(rawData.color_bg);

  return (
    <>
      <AutoRefresh />
      <DepartmentVerticalScreen section={section} pageBg={pageBg} />
    </>
  );
}
