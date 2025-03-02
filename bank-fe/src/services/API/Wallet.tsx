import { axiosPOST } from "@/lib/axios";

export default class Wallet {
  transfer(body: any) {
    return axiosPOST("api_gw", "/api/wallet/transfer", body);
  }

  withdraw(body: any) {
    return axiosPOST("api_gw", "/api/wallet/withdraw", body);
  }

  deposit(body: any) {
    return axiosPOST("api_gw", "/api/wallet/deposit", body);
  }
}
