import { useState } from "react";

export const useBanks = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const linkedBanks = [
    {
      id: 1,
      name: "Vietcombank",
      logoUrl: "/banks/vcb.png",
      accountNumber: "1023456789",
      balance: 28750000,
      active: true,
    },
    {
      id: 2,
      name: "TPBank",
      logoUrl: "/banks/tpb.png",
      accountNumber: "0987654321",
      balance: 12350000,
      active: true,
    },
    {
      id: 3,
      name: "MBBank",
      logoUrl: "/banks/mb.png",
      accountNumber: "1029384756",
      balance: 1750750,
      active: false,
    },
  ];

  return { hideBalances, setHideBalances, linkedBanks };
};
