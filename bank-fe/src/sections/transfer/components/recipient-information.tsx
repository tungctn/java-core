"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface RecipientInformationProps {
  recipientBank: string;
  setRecipientBank: (value: string) => void;
  recipientAccount: string;
  setRecipientAccount: (value: string) => void;
  recipientName: string;
  isValidatingAccount: boolean;
  onValidateAccount: () => void;
}

export function RecipientInformation({
  recipientBank,
  setRecipientBank,
  recipientAccount,
  setRecipientAccount,
  recipientName,
  isValidatingAccount,
  onValidateAccount,
}: RecipientInformationProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t("Recipient Information")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bank Selection */}
        <div className="space-y-2">
          <Label>{t("Bank")}</Label>
          <Select
            value={recipientBank}
            onValueChange={setRecipientBank}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder={t("Select recipient's bank")} />
            </SelectTrigger>
            <SelectContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={t("Search banks...")}
                  className="pl-9 mb-2"
                />
              </div>
              <SelectItem value="vcb">Vietcombank</SelectItem>
              <SelectItem value="tcb">Techcombank</SelectItem>
              <SelectItem value="mb">MB Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Account Number Input */}
        <div className="space-y-2">
          <Label>{t("Account Number")}</Label>
          <div className="relative">
            <Input
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              placeholder={t("Enter account number")}
              className="pr-24"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 gap-1"
              onClick={onValidateAccount}
              disabled={
                !recipientAccount || !recipientBank || isValidatingAccount
              }
            >
              {isValidatingAccount ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {t("Check")}
            </Button>
          </div>
        </div>

        {/* Recipient Name Display */}
        {recipientName && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-emerald-700 dark:text-emerald-300">
              {recipientName}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
