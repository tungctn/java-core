// app-sidebar.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatMoney } from "@/lib/helper";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RootState, useAppSelector } from "@/store/store";
import { URL_LIST } from "@/lib/config_global";

export function AppSidebar() {
  const { navMain } = useNavigation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const { t } = useTranslation();
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Demo data - Có thể lấy từ API trong thực tế
  const [quickActions] = useState([
    { id: 1, name: t("Transfer Money"), url: URL_LIST.root.transfer  },
    // { id: 2, name: t("Pay Bills"), url: URL_LIST.root.bills },
    // { id: 3, name: t("Top Up"), url: URL_LIST.root.topup },
  ]);

  return (
    <Sidebar
      collapsible="icon"
      className="mt-14 border-r border-slate-200/70 bg-gradient-to-b from-white to-slate-50/90 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.02)] transition-all duration-300 dark:from-slate-950 dark:to-slate-900/90 dark:border-slate-800/50"
    >
      <SidebarContent className="pb-6 pt-4">
        <div className="px-3 py-2">
          <div className="mb-6 px-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {t("Active Account")}
              </span>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-4 shadow-lg transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-white/90">
                  {t("Total Balance")}
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white text-[10px]"
                >
                  {user?.linkedBanks?.length ?? 0} {t("Banks")}
                </Badge>
              </div>
              <div className="mt-1 text-xl font-bold text-white">
                {formatMoney(user?.wallet?.balance)} VNĐ
              </div>
              <div className="mt-2 flex items-center text-xs text-white/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 mr-1 text-emerald-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0V7zm-7.364 5.636a1 1 0 0 1 0-1.414 7 7 0 0 1 9.9-9.9 1 1 0 0 1-1.414 1.414 5 5 0 0 0-7.072 7.072 1 1 0 0 1-1.414 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("Updated 2 minutes ago")}
              </div>
            </div>
          </div>
          {/* Financial Management */}
          <div className="mb-3 px-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold dark:text-slate-400">
              {t("Financial Management")}
            </h3>
          </div>
          <nav className="space-y-1.5 mb-6">
            <TooltipProvider delayDuration={200}>
              {navMain.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out",
                          item.isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md dark:from-blue-700 dark:to-indigo-800"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-blue-400"
                        )}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span className="relative">
                          <Icon
                            className={cn(
                              "h-5 w-5 transition-all duration-200",
                              item.isActive
                                ? "text-white"
                                : "text-slate-500 group-hover:text-blue-500 dark:text-slate-400 dark:group-hover:text-blue-400"
                            )}
                          />
                        </span>
                        <span className="flex-1">{item.title}</span>

                        {item.isActive && (
                          <motion.div
                            layoutId="sidebar-active-indicator"
                            className="absolute right-0 top-0 h-full w-1 rounded-l-full bg-white/70 dark:bg-blue-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {hoveredItem === index && !item.isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-slate-50/50 dark:bg-slate-800/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
          {/* Quick Actions */}
          <div className="mb-6 px-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold dark:text-slate-400">
                {t("Quick Actions")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {quickActions.map((action) => (
                <Link
                  key={action.id}
                  href={action.url}
                  className="px-3 py-1.5 rounded-md bg-slate-100 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                >
                  {action.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail className="bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-sm" />
    </Sidebar>
  );
}
