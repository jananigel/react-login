import LoginCard from "../../share/components/login/login-card.component";
import { LoginFormProvider } from "../../share/contexts/login-form.context";

const Login = () => {
  return (
    <>
      <LoginFormProvider>
        <LoginCard />
      </LoginFormProvider>
    </>
  )
}

export default Login;