import { axiosGET, axiosPOST } from "@/lib/axios";

export default class Email {
  getEmails() {
    return axiosGET("api_gw", "/api/emails");
  }

  sendEmailLogin(data: any) {
    return axiosPOST("api_gw", "/api/email/send-login-email", data);
  }
}
