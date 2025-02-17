"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import API from "@/services/API";
import LoadingScreen from "@/components/loading";
import { setAuthToken } from "@/lib/axios";
import { useAppDispatch } from "@/store/store";
import { getUserLogin } from "@/store/features/auth/action";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { URL_LIST } from "@/lib/config_global";

export default function VerifyLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const verifyLogin = async () => {
    try {
      const token = searchParams.get("token");
      if (!token) {
        throw new Error("No token provided");
      }
      const response = await API.Auth.verifyLogin({ code: token });
      if (response?.status === 200) {
        setAuthToken(response?.data?.data?.token);
        await dispatch(getUserLogin()).unwrap();
        toast({
          title: t("Login successful"),
        });
        router.push(URL_LIST.root.home);
      } else {
        throw new Error("Verification failed");
      }
    } catch (error: any) {
      toast({
        title: t("Login failed"),
        description: error?.data?.message,
        variant: "destructive",
      });
      router.push(URL_LIST.auth.login);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  if (isLoading) {
    return <LoadingScreen title={t("Verifying your login...")} />;
  }

  return null;
}
