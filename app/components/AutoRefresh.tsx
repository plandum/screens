"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TEN_MINUTES_MS = 10 * 60 * 1000;

export function AutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setInterval(() => {
      router.refresh();
    }, TEN_MINUTES_MS);

    return () => window.clearInterval(timer);
  }, [router]);

  return null;
}
