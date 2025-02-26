// home-header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "./user-dropdown";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm dark:bg-slate-900/90 border-b border-slate-200/70 dark:border-slate-800/50"
          : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/30"
      }`}
    >
      {/* Left side - Logo & Search */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center group">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="ml-3 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple sm:inline-block">
            BANK
          </span>
        </Link>
      </div>

      {/* Right side - User & Actions */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full h-9 w-9 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-slate-900">
              {notifications}
            </span>
          )}
        </Button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

        <UserDropdown />
      </div>
    </header>
  );
}
