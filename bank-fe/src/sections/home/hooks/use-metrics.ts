import { useState } from "react";

export const useMetrics = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const metrics = {
    totalTransactions: 43,
    transactionsChange: 12,
    totalInflow: 24560000,
    inflowChange: 8.5,
    totalOutflow: 18720000,
    outflowChange: -3.2,
    netBalance: 5840000,
    netBalanceChange: 15.7,
    successRate: 96.5,
    successRateChange: 2.1,
  };

  return { hideBalances, setHideBalances, metrics };
};
