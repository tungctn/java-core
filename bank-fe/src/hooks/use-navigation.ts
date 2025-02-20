"use client";

import { usePathname } from "next/navigation";
import { URL_LIST } from "@/lib/config_global";
import { FileText, Send, SquareTerminal } from "lucide-react";

export const useNavigation = () => {
  const pathname = usePathname();

  const navMain = [
    {
      title: "Home",
      url: URL_LIST.root.home,
      icon: SquareTerminal,
      isActive: pathname === URL_LIST.root.home,
    },
    {
      title: "Transactions",
      url: URL_LIST.root.transactions,
      icon: FileText,
      isActive: pathname === URL_LIST.root.transactions,
    },
    {
      title: "Transfer",
      url: URL_LIST.root.transfer,
      icon: Send,
      isActive: pathname === URL_LIST.root.transfer,
    },
  ];
  //       isActive: pathname === URL_LIST.root.users,
  //     },
  //     {
  //       title: "Settings",
  //       url: URL_LIST.root.settings,
  //       icon: Settings,
  //       isActive: pathname === URL_LIST.root.settings,
  //     },
  //   ],
  // },

  return {
    navMain,
  };
};
