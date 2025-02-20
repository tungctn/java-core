"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import React, { useState } from "react";

export default function HomeHeader() {
  const [hideBalances, setHideBalances] = useState(false);
  const { t } = useTranslation();
  return (
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
          <span>{hideBalances ? t("Show Balances") : t("Hide Balances")}</span>
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
  );
}
