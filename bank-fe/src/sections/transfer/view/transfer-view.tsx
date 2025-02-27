"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RecipientInformation } from "../components/recipient-information";
import { TransferDetails } from "../components/transfer-details";
import API from "@/services/API";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store/store";
import { RootState } from "@/store/store";
import { URL_LIST } from "@/lib/config_global";
import { useRouter } from "next/navigation";

export default function TransferView() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [recipientAccount, setRecipientAccount] = useState<string>("");
  const [recipientUser, setRecipientUser] = useState<any>(null);
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();
  const handleValidateAccount = async () => {
    if (!recipientAccount) return;
    setIsValidatingAccount(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      amount,
      description,
      recipientUser,
    });
    // Gọi API chuyển tiền ở đây
    const response = await API.Wallet.transfer({
      amount: parseInt(amount),
      description,
      fromUserId: user?.info?.id,
      toUserId: recipientUser?.id,
    });
    console.log(response);
    if (response?.status === 200) {
      toast({
        title: t("Transfer successfully"),
        description: t("Transfer successfully"),
      });
      router.push(URL_LIST.root.home);
    } else {
      toast({
        title: t("Transfer failed"),
        description: t("Transfer failed"),
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">{t("Transfer Money")}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t("Transfer money to other bank accounts")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <RecipientInformation
            recipientAccount={recipientAccount}
            setRecipientAccount={setRecipientAccount}
            isValidatingAccount={isValidatingAccount}
            setIsValidatingAccount={setIsValidatingAccount}
            setRecipientUser={setRecipientUser}
            setIsValidated={setIsValidated}
            setDescription={setDescription}
            onValidateAccount={handleValidateAccount}
          />
          <TransferDetails
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isValidated || !amount}
          >
            {t("Continue")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}
