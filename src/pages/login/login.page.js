import ScreenCenterLayout from "../../share/components/layouts/screen-center/screen-center.layout";
import LoginCard from "../../share/components/login/login-card/login-card.component";
import { LoginFormProvider } from "../../share/contexts/login-form.context";
import './login.module.scss';

const Login = () => {
  return (
    <>
      <ScreenCenterLayout>
        <LoginFormProvider>
          <LoginCard />
        </LoginFormProvider>
      </ScreenCenterLayout>
    </>
  )
}

export default Login;