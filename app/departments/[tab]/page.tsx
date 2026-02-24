import { notFound } from "next/navigation";
import { DepartmentVerticalScreen } from "@/app/components/DepartmentVerticalScreen";
import { adaptDirectorData } from "@/app/data/adaptDirectorData";

import rawData from "../../../test.json";

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

  const sections = adaptDirectorData(rawData);
  const section = sections[tabNumber - 1];

  if (!section) {
    notFound();
  }

  const pageBg =
    typeof rawData === "object" && rawData !== null && "color_bg" in rawData
      ? getScreenBg((rawData as { color_bg?: string }).color_bg)
      : "#001A37";

  return <DepartmentVerticalScreen section={section} pageBg={pageBg} />;
}
