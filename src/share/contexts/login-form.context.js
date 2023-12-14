import { createContext, useContext, useState } from "react";

const LoginFormContext = createContext();

export const LoginFormProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignInClick = () => {
  };

  const onBackToSignInClick = () => {

  };

  const onSignUpClick = () => {

  };

  const onSubmitSignUpClick = () => {

  };

  return (
    <LoginFormContext.Provider value={{
      account,
      password,
      confirmPassword,
      setAccount,
      setPassword,
      setConfirmPassword,
      onSignInClick,
      onBackToSignInClick,
      onSignUpClick,
      onSubmitSignUpClick,
    }}>
      { children }
    </LoginFormContext.Provider>
  );
}

export const useLoginFormContext = () => {
  return useContext(LoginFormContext);
};