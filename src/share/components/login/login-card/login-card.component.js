import { useCallback, useState } from "react";
import SignInForm from "../sign-in-form/sign-in-form.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";
import { useLoginFormContext } from "../../../contexts/login-form.context";
// import styles from './login-card.module.scss';

const LoginCard = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { account, password, confirmPassword, setAccount, setPassword, setConfirmPassword } = useLoginFormContext();

  const onSubmitClick = () => {
  }

  const onLoginTypeChanged = useCallback((type) => {
    setIsSignIn(type === 'signIn');
    setAccount('');
    setPassword('');
    setConfirmPassword('');
  }, [setIsSignIn, setAccount, setPassword, setConfirmPassword]);

  const form = () => {
    return isSignIn ?
      <SignInForm
        signUpClick={() => onLoginTypeChanged('signUp')}
        account={account}
        password={password}
        onSignInAccountChanged={(e) => setAccount(e)}
        onSignInPasswordChanged={(e) => setPassword(e)}>
      </SignInForm> :
      <SignUpForm
        signInClick={() => onLoginTypeChanged('signIn')}
        submitClick={(() => onSubmitClick())}
        account={account}
        password={password}
        confirmPassword={confirmPassword}
        onSignUpAccountChanged={(e) => setAccount(e)}
        onSignUpPasswordChanged={(e) => setPassword(e)}
        onSignUpConfirmPasswordChanged={(e) => setConfirmPassword(e)}>
      </SignUpForm>;
  }

  return (
    <>
      <div className="login-card">
        <div className="login-label">Login</div>
        { form() }
      </div>
    </>
  );
}

export default LoginCard;