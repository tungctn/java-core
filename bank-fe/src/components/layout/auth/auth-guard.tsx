"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { getAuthToken } from "@/lib/axios";
import { URL_LIST } from "@/lib/config_global";
import { LoadingScreen } from "@/components/loading";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  return <Container>{children}</Container>;
}

function Container({ children }: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const check = useCallback(() => {
    if (!getAuthToken()) {
      router.replace(URL_LIST.auth.login);
    } else {
      setChecked(true);
    }
  }, [router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
