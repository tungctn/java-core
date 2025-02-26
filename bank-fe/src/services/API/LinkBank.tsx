import { axiosGET, axiosPOST } from "@/lib/axios";

export default class LinkBank {
  getEmails() {
    return axiosGET("api_gw", "/api/link-bank");
  }

  sendEmailLogin(data: any) {
    return axiosPOST("api_gw", "/api/link-bank/create", data);
  }
}
