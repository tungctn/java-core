"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { HomeHeader } from "@/sections/home/components/home-header";
import { ProfileMain } from "../components/profile-main";

export function ProfileView() {
  return (
    <>
      <HomeHeader />
      <SidebarProvider className="mt-16 bg-[#F4F7FF]">
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1">
            <ProfileMain />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
} 