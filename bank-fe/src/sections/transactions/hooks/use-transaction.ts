export const useTransaction = () => {
  // Mock data
  const transactions = [
    {
      id: 1,
      type: "incoming",
      amount: 5000000,
      description: "Nhận tiền từ Nguyễn Văn A",
      bank: "Vietcombank",
      bankLogo: "https://api.vietqr.io/img/VCB.png",
      status: "success",
      date: "2024-02-21T08:30:00",
      reference: "REF123456789",
    },
    {
      id: 2,
      type: "outgoing",
      amount: 2000000,
      description: "Chuyển tiền cho Trần Thị B",
      bank: "TPBank",
      bankLogo: "https://api.vietqr.io/img/ICB.png",
      status: "success",
      date: "2024-02-21T10:15:00",
      reference: "REF987654321",
    },
    // Thêm các giao dịch mẫu khác...
  ];

  return { transactions };
};
