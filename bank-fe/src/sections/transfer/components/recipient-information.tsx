"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useState, useEffect } from "react";
import API from "@/services/API";
import { useAppSelector } from "@/store/store";
import { RootState } from "@/store/store";

interface RecipientInformationProps {
  recipientAccount: string;
  setRecipientAccount: (value: string) => void;
  isValidatingAccount: boolean;
  setIsValidatingAccount: (value: boolean) => void;
  setRecipientUser: (user: any) => void;
  setIsValidated: (value: boolean) => void;
  setDescription: (value: string) => void;
  onValidateAccount: () => void;
}

export function RecipientInformation({
  recipientAccount,
  setRecipientAccount,
  isValidatingAccount,
  setIsValidatingAccount,
  setRecipientUser,
  setIsValidated,
  onValidateAccount,
  setDescription,
}: RecipientInformationProps) {
  const { t } = useTranslation();
  const [recipientName, setRecipientName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);
  const [localIsValidated, setLocalIsValidated] = useState<boolean>(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    // Sync local validation state to parent component
    setIsValidated(localIsValidated);
  }, [localIsValidated, setIsValidated]);

  const searchUser = async () => {
    try {
      setLocalIsValidated(false);
      setValidationError(false);

      const response = await API.User.getUserPhoneNumber({
        phoneNumber: recipientAccount,
      });

      if (response?.status === 200 && response?.data?.data?.user) {
        const searchUser = response?.data?.data?.user;
        setRecipientName(
          (searchUser?.firstName?.toUpperCase() || "") +
            " " +
            (searchUser?.lastName?.toUpperCase() || "")
        );
        setAccountNumber(searchUser?.phoneNumber || "");
        setRecipientUser(searchUser); // Set the entire user object to parent
        setDescription(
          `${user?.info?.firstName?.toUpperCase()} ${user?.info?.lastName?.toUpperCase()} Transfer to ${searchUser?.firstName?.toUpperCase()} ${searchUser?.lastName?.toUpperCase()}`
        );
        setLocalIsValidated(true);
      } else {
        setValidationError(true);
      }
      setIsValidatingAccount(false);
    } catch (error) {
      console.error("Error searching for user:", error);
      setValidationError(true);
      setIsValidatingAccount(false);
    }
  };

  const handleValidateAccount = () => {
    onValidateAccount(); // This will set isValidatingAccount to true
    searchUser();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipientAccount(value);
    // Reset validation states when input changes
    setLocalIsValidated(false);
    setValidationError(false);
    setRecipientUser(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t("Recipient Information")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Phone Number Input */}
        <div className="space-y-2">
          <Label>{t("Phone Number")}</Label>
          <div className="relative">
            <Input
              value={recipientAccount}
              onChange={handleInputChange}
              placeholder={t("Enter phone number")}
              className="pr-24"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 gap-1"
              onClick={handleValidateAccount}
              disabled={!recipientAccount || isValidatingAccount}
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

        {/* Account Number Input - Only shown when validated successfully */}
        {localIsValidated && (
          <div className="space-y-2">
            <Label>{t("Account Number")}</Label>
            <div className="relative">
              <Input
                value={accountNumber}
                placeholder={t("Account number")}
                className="pr-24"
                disabled
              />
            </div>
          </div>
        )}

        {/* Recipient Name Display - Success */}
        {localIsValidated && recipientName && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-emerald-700 dark:text-emerald-300">
              {recipientName}
            </span>
          </div>
        )}

        {/* Error Message - When account not found */}
        {validationError && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="font-medium text-red-700 dark:text-red-300">
              {t("Account does not exist")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
