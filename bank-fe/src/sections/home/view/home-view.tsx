import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import AuthGuard from "@/components/layout/auth/auth-guard";
import { HomeHeader } from "../components/home-header";
import HomeMain from "../components/home-main";

export function HomeView() {
  return (
    <AuthGuard>
      <HomeHeader />
      <SidebarProvider className="mt-16 bg-[#F4F7FF]">
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1">
            <HomeMain />
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
