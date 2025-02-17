import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-gray-100">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
