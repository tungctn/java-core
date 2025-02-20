import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Header } from "./sidebar/header";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300`}
    >
      <Header />
      <SidebarProvider className="mt-16">
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 px-6 py-8 relative">
            {/* Background decorative elements */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl dark:bg-indigo-900/10"></div>
            <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl dark:bg-purple-900/10"></div>

            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
