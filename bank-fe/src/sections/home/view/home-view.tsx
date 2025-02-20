// home-view.tsx
"use client";

import HomeMain from "../components/home-main";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/main-layout";

export function HomeView() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MainLayout>
      <HomeMain />
    </MainLayout>
  );
}
