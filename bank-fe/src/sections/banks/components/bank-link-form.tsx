"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";
import { useState } from "react";

interface BankLinkFormProps {
  selectedBank: any;
  user: any;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export function BankLinkForm({
  selectedBank,
  user,
  onBack,
  onSubmit,
}: BankLinkFormProps) {
  const { t } = useTranslation();
  const [accountNumber, setAccountNumber] = useState("");
  const [personalId, setPersonalId] = useState(user?.cccd || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bank: selectedBank,
      accountNumber,
      userId: user?.id,
      fullName: `${user?.info?.firstName} ${user?.info?.lastName}`,
      personalId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
        <div className="h-12 w-12 relative flex-shrink-0">
          <Image
            src={selectedBank.logo}
            alt={selectedBank.shortName}
            className="rounded object-contain"
            fill
            sizes="48px"
          />
        </div>
        <div>
          <h3 className="font-medium">{selectedBank.shortName}</h3>
          <p className="text-sm text-slate-500">{selectedBank.name}</p>
        </div>
        <Button
          type="button"
          className="ml-auto cursor-pointer z-10"
          onClick={onBack}
        >
          {t("Change")}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>{t("Full Name")}</Label>
          <Input
            value={`${user?.info?.firstName?.toUpperCase()} ${user?.info?.lastName?.toUpperCase()}`}
            readOnly
            className="bg-slate-50"
          />
        </div>

        <div>
          <Label>{t("Account Number")}</Label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder={t("Enter your account number")}
          />
        </div>

        <div>
          <Label>{t("Personal ID")}</Label>
          <Input
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            placeholder={t("Enter your personal ID")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          {t("Back")}
        </Button>
        <Button type="submit">{t("Link Account")}</Button>
      </div>
    </form>
  );
}
