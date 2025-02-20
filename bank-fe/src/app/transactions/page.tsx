import TransactionView from "@/sections/transactions/view/transaction-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Transactions page",
};

export default function TransactionsPage() {
  return <TransactionView />;
}
