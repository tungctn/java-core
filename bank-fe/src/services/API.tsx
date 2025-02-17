import Auth from "./API/Auth";
import User from "./API/User";
import Email from "./API/Email";

const API = {
  Auth: new Auth(),
  User: new User(),
  Email: new Email(),
};

export default API;
