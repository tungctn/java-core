import { axiosGET } from "@/lib/axios";

export default class Bank {
  list() {
    return axiosGET("api_gw", "/api/banks/list");
  }
}
