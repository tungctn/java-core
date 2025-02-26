import Auth from "./API/Auth";
import User from "./API/User";
import Email from "./API/Email";
import Bank from "./API/Bank";
import LinkBank from "./API/LinkBank";
import Transaction from "./API/Transaction";

const API = {
  Auth: new Auth(),
  User: new User(),
  Email: new Email(),
  Bank: new Bank(),
  LinkBank: new LinkBank(),
  Transaction: new Transaction(),
};

export default API;
