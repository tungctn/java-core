import { axiosPOST } from "@/lib/axios";

export default class Wallet {
  transfer(body: any) {
    return axiosPOST("api_gw", "/api/wallet/transfer", body);
  }
}
