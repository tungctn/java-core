"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Building2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { formatMoney } from "@/lib/helper";
import Image from "next/image";

interface SourceSelectionProps {
  selectedSource: "wallet" | "bank";
  setSelectedSource: (value: "wallet" | "bank") => void;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  balance: number;
  linkedBanks: Array<{
    id: number;
    bank: string;
    accountNumber: string;
    balance: number;
    logo: string;
  }>;
}

export function SourceSelection({
  selectedSource,
  setSelectedSource,
  selectedBank,
  setSelectedBank,
  balance,
  linkedBanks,
}: SourceSelectionProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t("Select Source")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="wallet"
          value={selectedSource}
          onValueChange={(value) =>
            setSelectedSource(value as "wallet" | "bank")
          }
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="wallet" className="gap-2">
              <Wallet className="h-4 w-4" />
              {t("My Wallet")}
            </TabsTrigger>
            <TabsTrigger value="bank" className="gap-2">
              <Building2 className="h-4 w-4" />
              {t("Linked Banks")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 space-y-2">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {t("Available Balance")}
              </div>
              <div className="text-2xl font-bold">{formatMoney(balance)}</div>
            </div>
          </TabsContent>

          <TabsContent value="bank">
            <div className="space-y-3">
              {linkedBanks.map((bank) => (
                <div
                  key={bank.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedBank === bank.id.toString()
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                      : "border-slate-200 dark:border-slate-800 hover:border-blue-500/50"
                  }`}
                  onClick={() => setSelectedBank(bank.id.toString())}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 relative">
                        <Image
                          src={bank.logo}
                          alt={bank.bank}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{bank.bank}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {bank.accountNumber}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatMoney(bank.balance)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
