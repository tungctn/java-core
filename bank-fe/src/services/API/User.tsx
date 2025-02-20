import { axiosGET } from "@/lib/axios";

export default class User {
  me() {
    return axiosGET("api_gw", "/api/users/me");
  }
}
