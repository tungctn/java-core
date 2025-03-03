import { useForm } from "react-hook-form";
import { FormSchemaRegister } from "../schema";
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
// hooks/useRegisterForm.ts
export const useRegisterForm = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof FormSchemaRegister>>({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      phoneNumber: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
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
      const response = await API.Auth.register({
        phoneNumber: data.phoneNumber,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (response?.status === 200) {
        toast({ title: t("Register successfully") });
        setAuthToken(response?.data?.data?.token);
        await dispatch(getUserLogin()).unwrap();
        router.push(URL_LIST.root.home);
        toast({
          title: t("Register successful"),
          description: t(response?.data?.message),
        });
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast({
        title: t("Register failed"),
        variant: "destructive",
      });
      logger.error(error);
    }
  };

  return { form, handleSubmit };
};
