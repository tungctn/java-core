import { axiosGET, axiosPOST, axiosPUT } from "@/lib/axios";

export default class Auth {
  googleLogin(data: any) {
    return axiosPOST("api_gw", "/api/auth/google-login", data);
  }
  verifyLogin(data: any) {
    return axiosPOST("api_gw", "/api/auth/verify-email", data);
  }
  me() {
    return axiosGET("api_gw", "/api/account/me");
  }
  updateProfile(data: any) {
    return axiosPUT("api_gw", "/api/account/me", data);
  }
}
