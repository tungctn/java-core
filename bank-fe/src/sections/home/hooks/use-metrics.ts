import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/store";
import { useState } from "react";

export const useMetrics = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const metrics = {
    totalTransactions: user?.overviewTransaction?.totalTransactions,
    transactionsChange: 12,
    totalInflow: user?.overviewTransaction?.totalIncoming,
    inflowChange: 8.5,
    totalOutflow: user?.overviewTransaction?.totalOutgoing,
    outflowChange: -3.2,
    netBalance: user?.wallet?.balance,
    netBalanceChange: 15.7,
    successRate: 96.5,
    successRateChange: 2.1,
  };

  return { hideBalances, setHideBalances, metrics };
};
