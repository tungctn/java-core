import { useForm } from "react-hook-form";
import { FormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import API from "@/services/API";
import { z } from "zod";
import { useTranslation } from "@/hooks/use-translation";
import { logger } from "@/lib/helper";

// hooks/useLoginForm.ts
export const useLoginForm = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.trigger();
    const data = form.getValues();

    try {
      const response = await API.Email.sendEmailLogin({
        email: data.email,
        url: `${window.location.origin}/verify-email`,
      });

      if (response?.status === 200) {
        toast({ title: t("Email sent") });
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast({
        title: t("Email not sent"),
        variant: "destructive",
      });
      logger.error(error);
    }
  };

  return { form, handleSubmit };
};
