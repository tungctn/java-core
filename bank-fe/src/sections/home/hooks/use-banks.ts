import API from "@/services/API";

export const useBanks = () => {
  const handleDeposit = async (amount: number, bank: any) => {
    console.log("deposit", amount, bank);
    const res = await API.Wallet.deposit({
      amount: amount,
      linkBankId: bank.id,
    });
    return res;
  };

  const handleWithdraw = async (amount: number, bank: any) => {
    console.log("withdraw", amount, bank);
    const res = await API.Wallet.withdraw({
      amount: amount,
      linkBankId: bank.id,
    });
    return res;
  };

  return {
    handleDeposit,
    handleWithdraw,
  };
};
