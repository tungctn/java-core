"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useAppSelector } from "@/store/store";
import { RootState } from "@/store/store";
import MainLayout from "@/components/layout/main-layout";
import { BankSelection } from "@/sections/banks/components/bank-selection";
import { BankLinkForm } from "@/sections/banks/components/bank-link-form";
import { URL_LIST } from "@/lib/config_global";
import { useRouter } from "next/navigation";
import API from "@/services/API";

export default function CreateBankLink() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const handleBankSelect = (bank: any) => {
    setSelectedBank(bank);
    setStep(2);
  };

  const handleSubmit = async (data: any) => {
    console.log(data);
    try {
        const response = await API.LinkBank.sendEmailLogin(data);
        console.log('Kết quả từ API:', response);

        router.push(URL_LIST.root.home);
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {t("Link New Bank Account")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <BankSelection onBankSelect={handleBankSelect} />
            ) : (
              <BankLinkForm
                selectedBank={selectedBank}
                user={user}
                onBack={() => {
                  setStep(1);
                  setSelectedBank(null);
                  console.log("back");
                }}
                onSubmit={handleSubmit}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
