"use client";
import { LogOut } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { removeAuthToken } from "@/lib/axios";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const COLORS = [
  "bg-gradient-to-br from-red-500 to-red-600",
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-green-500 to-green-600",
  "bg-gradient-to-br from-amber-500 to-amber-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-600",
];

export function UserDropdown() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userColor] = useState(
    () => COLORS[Math.floor(Math.random() * COLORS.length)]
  );
  const handleLogout = () => {
    dispatch(logout());
    removeAuthToken();
    router.push("/login");
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
      variant: "default",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 p-1.5 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="relative">
            <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-slate-800 shadow-sm">
              <AvatarImage src={user?.info?.avatar} />
              <AvatarFallback
                className={`${userColor} text-white font-semibold`}
              >
                {user?.info?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">
                {user?.info?.firstName} {user?.info?.lastName}
              </span>
              <ChevronsUpDown className="h-3.5 w-3.5 text-slate-500" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {user?.info?.email}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        <div className="p-2">
          <div className="flex items-center gap-3 rounded-lg p-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 mb-2">
            <Avatar className="h-10 w-10 ring-2 ring-white/90 dark:ring-slate-800 shadow-md">
              <AvatarImage src={user?.info?.avatar} />
              <AvatarFallback
                className={`${userColor} text-white font-semibold`}
              >
                {user?.info?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {user?.info?.firstName} {user?.info?.lastName}
                </span>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 text-indigo-600 text-[10px] border-indigo-200 dark:bg-indigo-950/50 dark:border-indigo-800/60 dark:text-indigo-400"
                >
                  {user?.info?.role}
                </Badge>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[160px]">
                {user?.info?.email}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="mr-2 h-4 w-4 text-slate-500" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-rose-600 dark:text-rose-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
