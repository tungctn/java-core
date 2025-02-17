"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { RootState } from "@/store/store";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Bell,
  BadgeCheck,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { removeAuthToken } from "@/lib/axios";
import { URL_LIST } from "@/lib/config_global";
export function HomeHeader() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    removeAuthToken();
    router.push("/login");
    toast({
      title: "Logged out successfully",
    });
  };

  return (
    <header className="flex items-center justify-between px-6 border-b border-blueB3 fixed top-0 left-0 right-0 z-50 bg-[#F4F7FF]">
      {/* Left side - Logo */}
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center text-blueA bg-white rounded-lg px-2 py-1">
          <span className="text-sm mr-1">150</span>
          {/* <Image
            src="/assets/icons/credits.svg"
            alt="Credits"
            width={20}
            height={20}
          /> */}
          <CircleDollarSign className="w-4 h-4" />
        </div>
        <Button variant="outline">Upgrade</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{user?.fullName}</span>
              <ChevronsUpDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.fullName}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push(URL_LIST.root.profile)}>
                <BadgeCheck className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
