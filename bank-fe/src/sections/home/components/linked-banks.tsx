"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatMoney } from "@/lib/helper";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  Plus,
  Copy,
  MoreHorizontal,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useBanks } from "../hooks/use-banks";
import { useRouter } from "next/navigation";
export default function LinkedBanks() {
  const { t } = useTranslation();
  const { hideBalances, linkedBanks } = useBanks();
  const router = useRouter();

  const maskAccountNumber = (accNumber: any) => {
    if (!accNumber) return "";
    const firstFour = accNumber.substring(0, 4);
    const lastFour = accNumber.substring(accNumber.length - 4);
    return `${firstFour}•••••${lastFour}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {t("Linked Bank Accounts")}
        </h2>
        <Button
          className="gap-2"
          onClick={() => {
            router.push("/create-bank-link");
          }}
        >
          <Plus className="h-4 w-4" />
          {t("Add New Bank")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {linkedBanks.map((bank, index) => (
          <motion.div
            key={bank.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Card
              className={`overflow-hidden transition-all duration-200 hover:shadow-md ${
                !bank.active ? "opacity-70" : ""
              } border-slate-200 dark:border-slate-800`}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"></div>

                  <div className="relative pt-4 px-5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3 z-10">
                        <div className="h-14 w-14 rounded-full bg-white dark:bg-slate-900 shadow-md flex items-center justify-center p-2 border border-slate-200 dark:border-slate-700">
                          <Image
                            src={bank.logoUrl}
                            alt={bank.name}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                        <div className="pt-1.5">
                          <h3 className="font-medium text-slate-900 dark:text-slate-100">
                            {bank.name}
                          </h3>
                          <div className="flex items-center mt-0.5">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 cursor-pointer group">
                                    <span>
                                      {maskAccountNumber(bank.accountNumber)}
                                    </span>
                                    <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{t("Copy account number")}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            {t("Account Options")}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {t("View Details")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {t("Refresh Balance")}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-rose-600 dark:text-rose-400">
                            {bank.active ? t("Disconnect") : t("Reconnect")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-8">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {t("Available Balance")}
                    </span>
                    {!bank.active && (
                      <Badge
                        variant="outline"
                        className="text-amber-600 border-amber-200 bg-amber-50 text-[10px] dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50"
                      >
                        {t("Reconnect Required")}
                      </Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    {hideBalances ? "•••••••" : formatMoney(bank.balance)}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 px-1 text-sm"
                      disabled={!bank.active}
                    >
                      {t("Deposit")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 px-1 text-sm"
                      disabled={!bank.active}
                    >
                      {t("Withdraw")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 px-1 text-sm"
                      disabled={!bank.active}
                    >
                      {t("Transfer")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
