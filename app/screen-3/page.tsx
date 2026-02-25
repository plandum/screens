import { ThirdScreen } from "@/app/components/ThirdScreen";
import rawData from "../../test.json";

export default function ScreenThreePage() {
  const pageBg =
    typeof rawData === "object" && rawData !== null && "color_bg" in rawData
      ? getScreenBg((rawData as { color_bg?: string }).color_bg)
      : "#041221";

  return <ThirdScreen pageBg={pageBg} />;
}

function getScreenBg(rawBg: unknown): string {
  if (typeof rawBg !== "string" || rawBg.length === 0) {
    return "#041221";
  }

  return rawBg.startsWith("#") ? rawBg : `#${rawBg}`;
}
