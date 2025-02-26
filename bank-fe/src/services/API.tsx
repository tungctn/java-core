import Auth from "./API/Auth";
import User from "./API/User";
import Email from "./API/Email";
import Bank from "./API/Bank";

const API = {
  Auth: new Auth(),
  User: new User(),
  Email: new Email(),
  Bank: new Bank(),
};

export default API;
