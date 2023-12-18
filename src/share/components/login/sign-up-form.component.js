import { useCallback } from "react";
import TextButton from "../../widgets/text-button/text-button.widget";
import TextInput from "../../widgets/text-input.widget";

const SignUpForm = ({ signInClick, submitClick, account, password, confirmPassword, onSignUpAccountChanged, onSignUpPasswordChanged, onSignUpConfirmPasswordChanged }) => {

  const onSubmitClick = useCallback(() => {
    submitClick();
  }, [submitClick]);

  const onSignInClick = useCallback(() => {
    signInClick();
  }, [signInClick]);

  return (
    <>
      <TextInput placeholder={'Account'} value={account} onChange={(e) => onSignUpAccountChanged(e.target.value)}></TextInput>
      <TextInput placeholder={'Password'} value={password} type={'password'} onChange={(e) => onSignUpPasswordChanged(e.target.value)}></TextInput>
      <TextInput placeholder={'Confirm Password'} value={confirmPassword} type={'password'} onChange={(e) => onSignUpConfirmPasswordChanged(e.target.value)}></TextInput>
      <TextButton text={'Submit'} btnClick={() => onSubmitClick()}></TextButton>
      <TextButton text={'Sign In'} btnClick={() => onSignInClick()}></TextButton>
    </>
  )
}

export default SignUpForm;