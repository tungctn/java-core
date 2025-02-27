import Auth from "./API/Auth";
import User from "./API/User";
import Email from "./API/Email";
import Bank from "./API/Bank";
import LinkBank from "./API/LinkBank";
import Transaction from "./API/Transaction";
import Wallet from "./API/Wallet";
const API = {
  Auth: new Auth(),
  User: new User(),
  Email: new Email(),
  Bank: new Bank(),
  LinkBank: new LinkBank(),
  Transaction: new Transaction(),
  Wallet: new Wallet(),
};

export default API;
