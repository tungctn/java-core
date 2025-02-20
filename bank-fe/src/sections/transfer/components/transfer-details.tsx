"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/use-translation";

interface TransferDetailsProps {
  amount: string;
  setAmount: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export function TransferDetails({
  amount,
  setAmount,
  description,
  setDescription,
}: TransferDetailsProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t("Transfer Details")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t("Amount")}</Label>
          <div className="relative">
            <Input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setAmount(value);
              }}
              placeholder="0"
              required
              className="text-lg pl-12"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-400">
              ₫
            </div>
          </div>
          {amount && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t("In words")}: {/* Add number to words conversion */}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("Description")}</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("Enter transfer description")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
