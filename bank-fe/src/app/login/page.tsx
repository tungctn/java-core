import LoginView from "@/sections/auth/view/login-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Init() {
  return <LoginView />;
}
