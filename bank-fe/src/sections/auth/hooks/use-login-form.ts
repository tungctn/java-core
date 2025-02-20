import { useForm } from "react-hook-form";
import { FormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import API from "@/services/API";
import { z } from "zod";
import { useTranslation } from "@/hooks/use-translation";
import { logger } from "@/lib/helper";
import { getUserLogin } from "@/store/features/auth/action";
import { setAuthToken } from "@/lib/axios";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { URL_LIST } from "@/lib/config_global";
// hooks/useLoginForm.ts
export const useLoginForm = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.trigger();
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }
    const data = form.getValues();

    try {
      const response = await API.Auth.login({
        phoneNumber: data.phoneNumber,
        password: data.password,
      });

      if (response?.status === 200) {
        toast({ title: t("Login successfully") });
        setAuthToken(response?.data?.data?.token);
        await dispatch(getUserLogin()).unwrap();
        router.push(URL_LIST.root.home);
        toast({
          title: t("Login successful"),
          description: t(response?.data?.message),
        });
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast({
        title: t("Login failed"),
        variant: "destructive",
      });
      logger.error(error);
    }
  };

  return { form, handleSubmit };
};
