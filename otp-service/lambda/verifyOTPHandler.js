import { initializeFirebaseAdmin } from "../config/firebase";

export const handler = async (event) => {
  try {
    const admin = initializeFirebaseAdmin();
    const { phoneNumber, verificationId, otp } = JSON.parse(event.body);

    if (!phoneNumber || !verificationId || !otp) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Thiếu thông tin xác thực",
        }),
      };
    }

    // Xác thực OTP
    const credential = admin.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    );
    const userRecord = await admin.auth().signInWithCredential(credential);

    // Tạo custom token cho client
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Xác thực OTP thành công",
        customToken,
        uid: userRecord.uid,
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
        error: "Lỗi khi xác thực OTP",
        details: error.message,
      }),
    };
  }
};
