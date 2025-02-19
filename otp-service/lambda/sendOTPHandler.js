import { initializeFirebaseAdmin } from "../config/firebase";

export const handler = async (event) => {
  try {
    const admin = initializeFirebaseAdmin();
    const { phoneNumber } = JSON.parse(event.body);

    if (!phoneNumber) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Thiếu số điện thoại",
        }),
      };
    }

    // Tạo OTP token
    const phoneAuthProvider = new admin.auth.PhoneAuthProvider();
    const verificationId = await phoneAuthProvider.generateVerificationCode(
      phoneNumber
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Đã gửi mã OTP thành công",
        verificationId,
      }),
    };
  } catch (error) {
    console.error("Lỗi:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Lỗi khi gửi mã OTP",
        details: error.message,
      }),
    };
  }
};
