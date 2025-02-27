"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/use-translation";
import { convertNumberToWords, formatMoney } from "@/lib/helper";
import { useState, useEffect } from "react";

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
  const [amountInWords, setAmountInWords] = useState<string>("");
  const [baseDescription, setBaseDescription] = useState<string>("");

  // Lưu trữ description ban đầu khi component mount
  useEffect(() => {
    if (!baseDescription && description) {
      setBaseDescription(description);
    }
  }, [description, baseDescription]);

  const formatCurrency = (value: string): string => {
    // Loại bỏ tất cả ký tự không phải số
    const numericValue = value.replace(/\D/g, "");

    // Thêm dấu phẩy ngăn cách hàng nghìn
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Cập nhật số tiền bằng chữ khi amount thay đổi
  useEffect(() => {
    if (amount) {
      const numericAmount = parseInt(amount, 10);
      if (!isNaN(numericAmount)) {
        const words = convertNumberToWords(numericAmount);
        setAmountInWords(
          words.charAt(0).toUpperCase() + words.slice(1) + " đồng"
        );
      } else {
        setAmountInWords("");
      }
    } else {
      setAmountInWords("");
    }
  }, [amount]);

  // Cập nhật description khi amount thay đổi
  useEffect(() => {
    if (baseDescription) {
      if (amount) {
        setDescription(`${baseDescription} ${formatMoney(amount)} VND`);
      } else {
        setDescription(baseDescription);
      }
    }
  }, [amount, baseDescription, setDescription]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chỉ giữ lại các ký tự số
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
    // Không cần cập nhật description ở đây vì đã có useEffect phía trên
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    // Cập nhật baseDescription nếu người dùng thay đổi
    // Kiểm tra xem description mới có chứa số tiền không
    if (!newDescription.includes(formatMoney(amount)) && amount) {
      setBaseDescription(newDescription);
    } else if (!amount) {
      setBaseDescription(newDescription);
    }
  };

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
              value={formatCurrency(amount)}
              onChange={handleAmountChange}
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
              {t("In words")}: {amountInWords}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("Description")}</Label>
          <Input
            value={description}
            onChange={handleDescriptionChange}
            placeholder={t("Enter transfer description")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
