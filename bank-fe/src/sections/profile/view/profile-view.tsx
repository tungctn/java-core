"use client";
import { ProfileMain } from "../components/profile-main";
import MainLayout from "@/components/layout/main-layout";

export function ProfileView() {
  return (
    <MainLayout>
      <ProfileMain />
    </MainLayout>
  );
}
