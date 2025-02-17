"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { googleClientId } from "@/lib/config_global";
import { LogIn } from "lucide-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTranslation } from "@/hooks/use-translation";
import GoogleLoginButton from "./google-login-button";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginForm({}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const { form, handleSubmit } = useLoginForm();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="">
        <h1 className="text-[20px] font-medium">
          {t("Enter your email to join us or sign in")}
        </h1>
      </div>

      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLoginButton />
      </GoogleOAuthProvider>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm text-black items-center">
          <div className="w-full border-t border-black" />
          <span className="px-2">{t("or")}</span>
          <div className="w-full border-t border-black" />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email*"
                      className="h-12 border border-black rounded-[35px] bg-text6 px-6"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password*"
                      className="h-12 border border-black rounded-[35px] bg-text6 px-6"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 font-medium border border-black rounded-[35px] bg-white/50 text-black hover:bg-black/10"
            >
              {t("Login")}
              <LogIn className="mr-2" />
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-center text-sm text-muted-foreground">
        {t("If you don't have an account")}{" "}
        <a href="#" className="underline">
          {t("Sign up")}
        </a>{" "}
      </div>
    </div>
  );
}
