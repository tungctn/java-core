import TransferView from "@/sections/transfer/view/transfer-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfer",
  description: "Transfer page",
};

export default function TransferPage() {
  return <TransferView />;
}
