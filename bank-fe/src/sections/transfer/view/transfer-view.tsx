"use client";

import React, { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { RootState } from "@/store/store";
import { SourceSelection } from "../components/source-selection";
import { RecipientInformation } from "../components/recipient-information";
import { TransferDetails } from "../components/transfer-details";

// Mock data
const MOCK_LINKED_BANKS = [
  {
    id: 1,
    bank: "Vietcombank",
    accountNumber: "1023456789",
    balance: 15000000,
    logo: "https://api.vietqr.io/img/VCB.png",
  },
  {
    id: 2,
    bank: "TPBank",
    accountNumber: "0987654321",
    balance: 8000000,
    logo: "https://api.vietqr.io/img/TPB.png",
  },
];

export default function TransferView() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [selectedSource, setSelectedSource] = useState<"wallet" | "bank">(
    "wallet"
  );
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>(
    `${user?.firstName} ${user?.lastName} Transfer to bank`
  );
  const [recipientBank, setRecipientBank] = useState<string>("");
  const [recipientAccount, setRecipientAccount] = useState<string>("");
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [recipientName, setRecipientName] = useState<string>("");

  const handleValidateAccount = async () => {
    if (!recipientAccount || !recipientBank) return;
    setIsValidatingAccount(true);
    setTimeout(() => {
      setRecipientName("Nguyễn Văn A");
      setIsValidatingAccount(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      source: selectedSource,
      selectedBank,
      amount,
      description,
      recipientBank,
      recipientAccount,
      recipientName,
    });
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
          <SourceSelection
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
            linkedBanks={MOCK_LINKED_BANKS}
          />

          <RecipientInformation
            recipientBank={recipientBank}
            setRecipientBank={setRecipientBank}
            recipientAccount={recipientAccount}
            setRecipientAccount={setRecipientAccount}
            recipientName={recipientName}
            isValidatingAccount={isValidatingAccount}
            onValidateAccount={handleValidateAccount}
          />

          <TransferDetails
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
          />

          <Button type="submit" className="w-full" size="lg">
            {t("Continue")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}
