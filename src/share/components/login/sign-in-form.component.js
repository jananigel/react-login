import { useCallback } from "react";
import TextButton from "../../widgets/text-button/text-button.widget";
import TextInput from "../../widgets/text-input.widget";

const SignInForm = ({ signUpClick, signIn, account, password, onSignInAccountChanged, onSignInPasswordChanged }) => {

  const onSignIn = useCallback(() => {
    signIn();
  }, [signIn]);

  const onSignUpClick = useCallback(() => {
    signUpClick();
  }, [signUpClick]);

  return (
    <>
      <TextInput placeholder={'Account'} value={account} onChange={(e) => onSignInAccountChanged(e.target.value)}></TextInput>
      <TextInput placeholder={'Password'} value={password} type={'password'} onChange={(e) => onSignInPasswordChanged(e.target.value)}></TextInput>
      <TextButton text={'Sign In'} btnClick={() => onSignIn()}></TextButton>
      <TextButton text={'Sign Up'} btnClick={() => onSignUpClick()}></TextButton>
    </>
  )
}

export default SignInForm;