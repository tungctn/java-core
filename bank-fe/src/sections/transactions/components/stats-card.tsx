import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCcw, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { formatMoney } from "@/lib/helper";
import { useTranslation } from "@/hooks/use-translation";

export default function StatsCard() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("Total Transactions")}
              </p>
              <h3 className="text-2xl font-bold mt-1">2,345</h3>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center dark:bg-blue-950/50">
              <RefreshCcw className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("Money In")}
              </p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
                {formatMoney(15000000)}
              </h3>
            </div>
            <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center dark:bg-emerald-950/50">
              <ArrowUpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("Money Out")}
              </p>
              <h3 className="text-2xl font-bold mt-1 text-rose-600 dark:text-rose-400">
                {formatMoney(8000000)}
              </h3>
            </div>
            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center dark:bg-rose-950/50">
              <ArrowDownCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
