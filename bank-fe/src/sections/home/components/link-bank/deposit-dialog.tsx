"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/use-translation";
import { formatMoney } from "@/lib/helper";
import Image from "next/image";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBanks } from "../../hooks/use-banks";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/store";
import { getUserLogin } from "@/store/features/auth/action";

interface DepositDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bank: any;
}

export function DepositDialog({ isOpen, onClose, bank }: DepositDialogProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { handleDeposit: handleDepositFn } = useBanks();
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };
  const dispatch = useAppDispatch();

  const handleDeposit = async () => {
    if (!amount || parseInt(amount) <= 0) return;
    try {
      setIsProcessing(true);
      const res = await handleDepositFn(Number(amount), bank);
      if (res?.status == 200) {
        toast({
          title: t("Deposit successful"),
          description: t("Deposit successful"),
        });
        onClose();
      }
      dispatch(getUserLogin());
    } catch (error) {
      console.log("error", error);
      toast({
        title: t("Deposit failed"),
        description: t("Deposit failed"),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setAmount("");
        onClose();
        setIsProcessing(false);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("Deposit to Bank Account")}
          </DialogTitle>
          <DialogDescription>
            {t("Transfer money from your wallet to your bank account")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bank Info */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="h-12 w-12 relative">
              <Image
                src={bank?.logoUrl}
                alt={bank?.name}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">
                {bank?.name}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {bank?.accountNumber}
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">{t("Amount")}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{t("Minimum amount is 50,000₫")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="amount"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                className="pl-12 text-lg"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">
                ₫
              </div>
            </div>

            {amount && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {t("Amount in words")}: {formatMoney(amount)} VNĐ
              </div>
            )}
          </div>

          {/* Available Balance */}
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              {t("Available in wallet")}:
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {formatMoney(50000000)} VNĐ
            </span>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">{t("Note (Optional)")}</Label>
            <Input
              id="note"
              placeholder={t("Enter note for this transaction")}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleDeposit}
            disabled={!amount || parseInt(amount) <= 0 || isProcessing}
            className="gap-2"
          >
            {isProcessing ? t("Processing...") : t("Deposit")}
            {!isProcessing && <ArrowRight className="h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
