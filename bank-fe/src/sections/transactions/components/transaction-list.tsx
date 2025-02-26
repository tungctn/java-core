import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { formatDate, formatMoney } from "@/lib/helper";
import { useTransaction } from "../hooks/use-transaction";

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/50";
    case "pending":
      return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50";
    case "failed":
      return "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/50";
    default:
      return "";
  }
};

export default function TransactionList() {
  const { t } = useTranslation();
  const { transactions } = useTransaction();
  //  [
  //    {
  //      id: 11,
  //      userId: null,
  //      fromUser: 0,
  //      toUser: 1,
  //      toBankId: 0,
  //      fromBankId: 2,
  //      amount: "1000000",
  //      currency: "VND",
  //      description: "Deposit 1000000 VND from NGUYEN THANH TUNG-1028848006",
  //      transactionType: "DEPOSIT",
  //      status: "COMPLETED",
  //    },
  //  ];
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {transactions?.map((transaction) => (
            <div
              key={transaction?.id}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center ${
                      transaction?.transactionType === "DEPOSIT"
                        ? "bg-emerald-50 dark:bg-emerald-950/50"
                        : "bg-rose-50 dark:bg-rose-950/50"
                    }`}
                  >
                    {transaction?.transactionType === "DEPOSIT" ? (
                      <ArrowUpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {transaction?.description}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {/* {new Date(transaction?.createdAt).toLocaleString()} */}
                        {formatDate(transaction?.createdAt)}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">
                        •
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {transaction?.reference}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`font-medium ${
                      transaction?.transactionType === "DEPOSIT"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {transaction?.transactionType === "DEPOSIT" ? "+" : "-"}
                    {formatMoney(transaction?.amount)}
                  </span>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={getStatusColor(transaction?.status)}
                    >
                      {t(transaction?.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
