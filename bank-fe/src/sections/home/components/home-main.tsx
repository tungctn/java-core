"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  DollarSign,
  CheckCircle,
  XCircle,
  Plus,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatMoney } from "@/lib/helper";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

export default function HomeMain() {
  const { t } = useTranslation();
  const [hideBalances, setHideBalances] = useState(false);

  // Mock data - would come from API in real app
  const metrics = {
    totalTransactions: 43,
    transactionsChange: 12,
    totalInflow: 24560000,
    inflowChange: 8.5,
    totalOutflow: 18720000,
    outflowChange: -3.2,
    netBalance: 5840000,
    netBalanceChange: 15.7,
    successRate: 96.5,
    successRateChange: 2.1,
  };

  const linkedBanks = [
    {
      id: 1,
      name: "Vietcombank",
      logoUrl: "/banks/vcb.png",
      accountNumber: "1023456789",
      balance: 28750000,
      active: true,
    },
    {
      id: 2,
      name: "TPBank",
      logoUrl: "/banks/tpb.png",
      accountNumber: "0987654321",
      balance: 12350000,
      active: true,
    },
    {
      id: 3,
      name: "MBBank",
      logoUrl: "/banks/mb.png",
      accountNumber: "1029384756",
      balance: 1750750,
      active: false,
    },
  ];

  // Utility function to mask account number
  const maskAccountNumber = (accNumber: any) => {
    if (!accNumber) return "";
    const firstFour = accNumber.substring(0, 4);
    const lastFour = accNumber.substring(accNumber.length - 4);
    return `${firstFour}•••••${lastFour}`;
  };

  // Show change with arrow indicator
  const ChangeIndicator = ({
    value,
    showColor = true,
  }: {
    value: number;
    showColor?: boolean;
  }) => {
    if (value === 0) return <span className="text-slate-500">0%</span>;

    const isPositive = value > 0;

    return (
      <div
        className={`flex items-center ${
          showColor
            ? isPositive
              ? "text-emerald-600 dark:text-emerald-500"
              : "text-rose-600 dark:text-rose-500"
            : ""
        }`}
      >
        {isPositive ? (
          <ChevronUp className="h-3 w-3 mr-1" />
        ) : (
          <ChevronDown className="h-3 w-3 mr-1" />
        )}
        <span>{Math.abs(value)}%</span>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t("Financial Dashboard")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("Overview of your financial activities this month")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-slate-600 dark:text-slate-300"
            onClick={() => setHideBalances(!hideBalances)}
          >
            {hideBalances ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            <span>
              {hideBalances ? t("Show Balances") : t("Hide Balances")}
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-slate-600 dark:text-slate-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t("Refresh")}</span>
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
            <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {t("Total Transactions")}
              </CardTitle>
              <div className="bg-blue-50 dark:bg-blue-950/50 p-2 rounded-full">
                <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {metrics.totalTransactions}
              </div>
              <div className="flex items-center justify-between mt-1">
                <ChangeIndicator value={metrics.transactionsChange} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("vs. last month")}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
            <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {t("Total Money In")}
              </CardTitle>
              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-full">
                <ArrowUpCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {hideBalances ? "•••••••" : formatMoney(metrics.totalInflow)}
              </div>
              <div className="flex items-center justify-between mt-1">
                <ChangeIndicator value={metrics.inflowChange} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("vs. last month")}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
            <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {t("Total Money Out")}
              </CardTitle>
              <div className="bg-rose-50 dark:bg-rose-950/50 p-2 rounded-full">
                <ArrowDownCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {hideBalances ? "•••••••" : formatMoney(metrics.totalOutflow)}
              </div>
              <div className="flex items-center justify-between mt-1">
                <ChangeIndicator value={metrics.outflowChange} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("vs. last month")}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                  style={{ width: "53%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
            <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {t("Net Balance")}
              </CardTitle>
              <div className="bg-indigo-50 dark:bg-indigo-950/50 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {hideBalances ? "•••••••" : formatMoney(metrics.netBalance)}
              </div>
              <div className="flex items-center justify-between mt-1">
                <ChangeIndicator value={metrics.netBalanceChange} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("vs. last month")}
                </span>
              </div>
              <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="md:col-span-2 lg:col-span-4"
        >
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardHeader className="p-5 pb-0">
              <div className="flex justify-between items-center w-full">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {t("Transaction Success Rate")}
                </CardTitle>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {metrics.successRate}%
                  </Badge>
                  <ChangeIndicator value={metrics.successRateChange} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                  style={{ width: `${metrics.successRate}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  <span>
                    {t("Success")}: {metrics.successRate}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-rose-500" />
                  <span>
                    {t("Failed")}: {(100 - metrics.successRate).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Linked Banks Section */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {t("Linked Bank Accounts")}
          </h2>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
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
                            <img
                              src={bank.logoUrl}
                              alt={bank.name}
                              className="h-9 w-9 object-contain"
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

          {/* Add New Bank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * linkedBanks.length }}
          >
            <Card className="overflow-hidden h-full border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center justify-center">
              <CardContent className="h-full flex flex-col items-center justify-center py-10 text-center">
                <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Plus className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  {t("Connect New Bank")}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                  {t(
                    "Link your other bank accounts to manage all finances in one place"
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
