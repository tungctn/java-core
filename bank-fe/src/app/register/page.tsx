import RegisterView from "@/sections/auth/view/register-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account",
};

export default function Init() {
  return <RegisterView />;
}
