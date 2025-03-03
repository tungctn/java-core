import { axiosPOST, axiosPUT } from "@/lib/axios";

export default class Auth {
  googleLogin(data: any) {
    return axiosPOST("api_gw", "/api/auth/google-login", data);
  }
  verifyLogin(data: any) {
    return axiosPOST("api_gw", "/api/auth/verify-email", data);
  }

  updateProfile(data: any) {
    return axiosPUT("api_gw", "/api/auth/me", data);
  }
  login(data: any) {
    return axiosPOST("api_gw", "/api/auth/login", data);
  }
  register(data: any) {
    return axiosPOST("api_gw", "/api/auth/register", data);
  }
}
