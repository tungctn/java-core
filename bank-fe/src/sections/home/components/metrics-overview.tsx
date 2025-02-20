"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatMoney } from "@/lib/helper";
import { motion } from "framer-motion";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  DollarSign,
  RefreshCw,
  XCircle,
} from "lucide-react";
import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/ui/badge";
import { useMetrics } from "../hooks/use-metrics";

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

export default function MetricsOverview() {
  const { t } = useTranslation();
  const { hideBalances, metrics } = useMetrics();

  return (
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
  );
}
