import { useEffect, useState } from "react"
import styles from './password-strength-checker.module.scss';

export const PasswordStrengthChecker = ({ password }) => {

  const [ passwordLevel, setPasswordLevel ] = useState(0);

  const strengthChecker = () => {

    if (!password || password?.length < 6) {
      setPasswordLevel(0);
      return;
    }

    let strength = 0;

    if (password.length >= 12) {
      strength++;
    }

    if (/[a-z]/.test(password)) {
      strength++;
    }

    if (/[A-Z]/.test(password)) {
      strength++;
    }

    if (/\d/.test(password)) {
      strength++;
    }

    if (/[!@#$%^&*();{}]/.test(password)) {
      strength++;
    }

    setPasswordLevel(strength);
  };

  const strengthTxt = () => {
    return ['', 'Lame', 'Weak', 'Medium', 'Good', 'Strong']
  }

  const level = (levelNum, id) => {
    const status = styles[strengthTxt()[passwordLevel].toLowerCase()];
    return (<span key={id} className={`${styles.level} ${passwordLevel >= levelNum ? styles.active : ''} ${status}`}></span>);
  }

  useEffect(() => {
    strengthChecker(strengthChecker(password));
  }, [password]);

  return (
    <>
      <div className={styles.strength}>
        <div className={styles.info}>
          <div className={styles.title}>Password Strength</div>
          <div className={styles.type}>{ strengthTxt()[passwordLevel] }</div>
        </div>
        <div className={styles.levels}>
          {
            strengthTxt().filter((_, i) => i !== 0).map((_, i) => level(i < 1 ? 0 : i + 1, i))
          }
        </div>
      </div>
    </>
  )
}