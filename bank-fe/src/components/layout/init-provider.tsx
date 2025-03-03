"use client";

import { useAppDispatch } from "@/store/store";
import { getAuthToken } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { logger } from "@/lib/helper";
import { URL_LIST } from "@/lib/config_global";
import { getUserLogin } from "@/store/features/auth/action";

const InitAppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const access_token = getAuthToken();
  const router = useRouter();
  const getDataForDisplay = useCallback(async () => {
    try {
      await dispatch(getUserLogin());
    } catch (e) {
      logger.log("error", e);
    }
  }, [dispatch]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === "/login";
    const isRegisterPage = currentPath === "/register";

    if (!access_token && !isLoginPage && !isRegisterPage) {
      router.push(URL_LIST.auth.login);
    }
    if (access_token) {
      getDataForDisplay();
    }
  }, [access_token, getDataForDisplay, router]);

  return <>{children}</>;
};

export default InitAppProvider;
