import { Suspense } from "react";
import LoadingScreen from "@/components/loading";
import VerifyLogin from "@/sections/auth/view/verify-login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email",
};

export default function Init() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <VerifyLogin />
    </Suspense>
  );
}
