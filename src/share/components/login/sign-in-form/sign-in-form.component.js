import { useCallback } from "react";
import TextButton from "../../../widgets/text-button/text-button.widget";
import TextInput from "../../../widgets/text-input/text-input.widget";
import { useForm } from 'react-hook-form';

const SignInForm = ({ signUpClick, account, password, onSignInAccountChanged, onSignInPasswordChanged }) => {

  const { register, handleSubmit, formState, trigger, setValue,  } = useForm({mode: 'all'});
  const { isDirty, touchedFields, errors } = formState;

  const onSignIn = useCallback((data) => {
    console.log('err = ', errors, ' register = ', data);
  }, [errors]);

  const onSignInError = useCallback((data) => {
    console.log('data = ', data);
  }, [errors]);

  const onSignUpClick = useCallback(() => {
    signUpClick();
  }, [signUpClick]);

  // return (
  //   <form onSubmit={handleSubmit(onSignIn)}>
  //     <div>
  //       <label>Name</label>
  //       <input type="text" name="name" {...register('name')} />
  //       {errors?.name && errors.name.message}
  //     </div>
  //     {/* more input fields... */}
  //     <button>Submit</button>
  //   </form>
  // );
  return (
    <>
      <form onSubmit={handleSubmit(onSignIn, onSignInError)}>
        <TextInput
          isInvalid={ errors?.account && touchedFields?.account && !isDirty?.account }
          placeholder={'Account'}
          value={account}
          register={
            {...register('account', { required: 'Account is required' })}
          }
          onChange={(e) => {
            onSignInAccountChanged(e.target.value);
            setValue('account', e.target.value);
            trigger('account');
          }}>
        </TextInput>
        {(errors?.account) && <span>{errors?.account.message}</span>}
        <TextInput
          isInvalid={ errors?.account && touchedFields?.password && !isDirty?.password }
          placeholder={'Password'}
          value={password}
          type={'password'}
          register={{...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
              maxLength: {
                value: 12,
                message: 'Password cannot over 12 characters'
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+;])[0-9a-zA-Z!@#$%^&*()_+;]{6,12}$/,
                message: 'Least one special character, one uppercase and lowercase letter and one number',
              }
            },
          )}}
          onChange={(e) => {
            onSignInPasswordChanged(e.target.value);
            setValue('password', e.target.value);
            trigger('password')}}>
        </TextInput>
        {(errors?.password && errors.password.type === 'required') && <span>{errors.password.message}</span>}
        {(errors?.password && errors.password.type === 'minLength') && <span>{errors.password.message}</span>}
        {(errors?.password && errors.password.type === 'maxLength') && <span>{errors.password.message}</span>}
        {(errors?.password && errors.password.type === 'pattern') && <span>{errors.password.message}</span>}
        <TextButton text={'Sign In'}></TextButton>
        <TextButton type={'secondary'} text={'Sign Up'} btnClick={() => onSignUpClick()}></TextButton>
      </form>
    </>
  )
}

export default SignInForm;