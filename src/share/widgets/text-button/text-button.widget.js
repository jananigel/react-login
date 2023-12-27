import { useCallback } from "react";
import styles from './text-button.module.scss';

const TextButton = ({ text, type, btnClick }) => {
  const onBtnClick = useCallback(() => {
    btnClick && btnClick();
  }, [btnClick ?? null]);
  return (
    <button className={type === 'secondary' ? styles.secondary : '' } onClick={() => onBtnClick()}>{ text }</button>
  );
}

export default TextButton;