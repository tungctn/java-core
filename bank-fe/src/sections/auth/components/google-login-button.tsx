import { Button } from "@/components/ui/button";
import { decryptData } from "@/lib/crypto";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";

const GoogleLoginButton = () => {
  const { t } = useTranslation();
  const { handleGoogleLogin } = useAuth();
  const login = useGoogleLogin({
    onSuccess: async (credentialResponse: any) => {
      const decodedData = await decryptData(credentialResponse?.access_token);
      await handleGoogleLogin(decodedData);
    },
    onError: () => {
      toast({
        title: t("Login failed"),
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      variant="outline"
      className="w-full h-12 font-regular bg-text6 text-black rounded-[35px]"
      type="button"
      onClick={() => login()}
    >
      <Image
        src="/assets/images/auth/google.svg"
        alt="Google"
        width={24}
        height={24}
        className="mr-2"
      />
      {t("Continue with Google")}
    </Button>
  );
};

export default GoogleLoginButton;
