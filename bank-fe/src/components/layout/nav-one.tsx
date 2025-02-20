"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavOne({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup className="px-3">
      <SidebarMenu className="space-y-1">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={cn(
                "w-full rounded-xl px-4 py-3 transition-all duration-200",
                "hover:bg-primary/5 hover:scale-[1.02]",
                "flex items-center gap-3",
                item.isActive
                  ? "bg-primary/10 text-primary font-semibold shadow-sm"
                  : "text-gray-600"
              )}
            >
              <a href={item.url}>
                {item.icon && (
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      item.isActive ? "text-primary" : "text-gray-500"
                    )}
                  />
                )}
                <span className="text-sm">{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
