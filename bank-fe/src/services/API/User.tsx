import { axiosGET } from "@/lib/axios";
import { urlParseParams } from "@/lib/helper";

export default class User {
  me() {
    return axiosGET("api_gw", "/api/users/me");
  }

  getUserPhoneNumber(params: any) {
    const queryString = urlParseParams(params);
    return axiosGET("api_gw", `/api/users/search-phone-number?${queryString}`);
  }
}
