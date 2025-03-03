"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { LogIn } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useRegisterForm } from "../hooks/use-register-form";
import { URL_LIST } from "@/lib/config_global";

export function RegisterForm({}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const { form, handleSubmit } = useRegisterForm();
  return (
    <div className="space-y-8">
      {/* Header */}

      <Form {...form}>
        <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>{t("First Name*")}</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="First Name*"
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
                    name="lastName"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>{t("Last Name*")}</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Last Name*"
                            className="h-12 border border-black rounded-[35px] bg-text6 px-6"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Phone number*")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number*"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Email*")}</FormLabel>
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
            
            <div className="flex space-x-4">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>{t("Password*")}</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Password*"
                            className="h-12 border border-black rounded-[35px] bg-text6 px-6"
                            type="password"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>{t("Confirm Password*")}</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Confirm Password*"
                            className="h-12 border border-black rounded-[35px] bg-text6 px-6"
                            type="password"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-medium border border-black rounded-[35px] bg-white/50 text-black hover:bg-black/10"
            >
              {t("Register")}
              <LogIn className="mr-2" />
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="text-center text-sm text-muted-foreground">
        {t("If you have an account")}{" "}
        <a href={URL_LIST.auth.login} className="underline">
          {t("Sign in")}
        </a>{" "}
      </div>
    </div>
  );
}
