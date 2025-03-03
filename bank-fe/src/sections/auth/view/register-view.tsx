import { RegisterForm } from "../components/register-form";
import AuthView from "../layout/auth-view";

export default function RegisterView() {
  return (
    <AuthView>
        <RegisterForm/>
    </AuthView>
  );
}
