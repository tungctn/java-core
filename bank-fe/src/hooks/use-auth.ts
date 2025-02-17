import { setAuthToken } from "@/lib/axios";
import { URL_LIST } from "@/lib/config_global";
import { getUserLogin } from "@/store/features/auth/action";
import API from "@/services/API";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { useTranslation } from "./use-translation";
export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleGoogleLogin = async (data: any) => {
    try {
      const res = await API.Auth.googleLogin(data);
      if (res?.status === 200) {
        setAuthToken(res?.data?.data?.token);
        await dispatch(getUserLogin()).unwrap();
        router.push(URL_LIST.root.home);
        toast({
          title: t("Login successful"),
          description: t(res?.data?.message),
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: t("Login failed"),
        variant: "destructive",
      });
    }
  };

  return { handleGoogleLogin };
};
