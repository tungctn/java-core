import { axiosGET } from "@/lib/axios";

export default class Transaction {
  list() {
    return axiosGET("api_gw", "/api/transactions/list");
  }
}
