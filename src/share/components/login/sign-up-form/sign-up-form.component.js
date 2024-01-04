import { useCallback, useState } from "react";
import TextButton from "../../../widgets/text-button/text-button.widget";
import TextInput from "../../../widgets/text-input/text-input.widget";
import { useForm } from 'react-hook-form';
import { PasswordStrengthChecker } from "../../password-strength-checker/password-strength-checker.component";
import styles from './sign-up-form.module.scss';
import { PasswordGeneratorModal } from "../../modals/passowrd-generator-modal/password-generator-modal.component";

const SignUpForm = ({ signInClick, submitClick, account, password, confirmPassword, onSignUpAccountChanged, onSignUpPasswordChanged, onSignUpConfirmPasswordChanged }) => {

  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue, getValues, formState } = useForm({mode: 'all'});
  const { isDirty, touchedFields } = formState;
  const [ isShowPasswordGenerator, setIsShowPasswordGenerator ] = useState(false);

  const onSubmitClick = useCallback(() => {
    // submitClick();
  }, []);

  const onSubmitErrorHandler = (err) => {
    console.log('err = ', err, ' isTouched = ', touchedFields, ' isDirty = ', isDirty);
  }

  const onSignInClick = useCallback(() => {
    signInClick();
  }, [signInClick]);

  const onConfirmPasswordGenerator = useCallback((res) => {
    onSignUpPasswordChanged(res);
    onSignUpConfirmPasswordChanged(res);
    setValue('password', res);
    trigger('password');
    setValue('confirmPassword', res);
    trigger('confirmPassword');
    setIsShowPasswordGenerator(false);
  }, []);

  const onClosePasswordGenerator = () => {
    setIsShowPasswordGenerator(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitClick, onSubmitErrorHandler)}>
        <TextInput
          isInvalid={ errors?.account && touchedFields?.account && !isDirty?.account }
          placeholder={'Account'}
          value={account}
          register={
            {...register('account', { required: 'Account is required' })}
          }
          onChange={(e) => {
            onSignUpAccountChanged(e.target.value);
            setValue('account', e.target.value);
            trigger('account');
          }}>
        </TextInput>
        <TextInput
          isInvalid={errors?.password && touchedFields?.password && !isDirty?.password }
          placeholder={'Password'}
          value={password}
          type={'password'}
          register={
            {...register('password', {
              required: {
                value: true,
                message: 'Password cannot be empty',
              },
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
              // maxLength: {
              //   value: 12,
              //   message: 'Password cannot over 12 characters'
              // },
              // pattern: {
              //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+;])[0-9a-zA-Z!@#$%^&*()_+;]{6,12}$/,
              //   message: 'Least one special character, one uppercase and lowercase letter and one number',
              // }
            })}
          }
          onChange={(e) => {
            onSignUpPasswordChanged(e.target.value);
            setValue('password', e.target.value);
            trigger('password');
            console.log('is dirty = ', errors?.password);

          }}>
        </TextInput>
        <TextInput
          isInvalid={ errors?.confirmPassword && touchedFields?.confirmPassword && !isDirty?.confirmPassword }
          placeholder={'Confirm Password'}
          value={confirmPassword}
          type={'password'}
          register={
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'Confirm password cannot be empty',
              },
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Password does not match'
                }
              },
            })}
          }
          onChange={(e) => {
            onSignUpConfirmPasswordChanged(e.target.value);
            setValue('confirmPassword', e.target.value);
            trigger('confirmPassword');
          }}>
        </TextInput>
        { (!errors?.password && touchedFields?.password) && <PasswordStrengthChecker password={getValues('password')}></PasswordStrengthChecker> }
        <div className={styles.footer}>
          <div className={styles['left-area']}>
            <TextButton text={'Submit'}></TextButton>
            <TextButton type={'secondary'} text={'Sign In'} btnClick={() => onSignInClick()}></TextButton>
          </div>
          <div className={styles['right-area']}>
            <span onClick={() => setIsShowPasswordGenerator(true)}>Generator</span>
            { isShowPasswordGenerator && <PasswordGeneratorModal isShow={isShowPasswordGenerator} id={Date.now()} onConfirm={onConfirmPasswordGenerator} onClose={() => onClosePasswordGenerator()}/> }
          </div>
        </div>
      </form>
    </>
  )
}

export default SignUpForm;