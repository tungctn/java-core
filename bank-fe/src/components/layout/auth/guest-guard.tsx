"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuthToken } from "@/lib/axios";
import { URL_LIST } from "@/lib/config_global";
import LoadingScreen from "@/components/loading";
type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();
  const token = getAuthToken();
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const checkPermissions = async (): Promise<void> => {
    setIsChecking(true);
    if (token) {
      router.replace(URL_LIST.root.home);
      return;
    }
    setIsChecking(false);
  };
  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isChecking) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
}
