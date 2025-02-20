import CreateBankLink from "@/sections/banks/view/create-bank-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Bank Link",
  description: "Create Bank Link page",
};

export default function CreateBankLinkPage() {
  return <CreateBankLink />;
}
