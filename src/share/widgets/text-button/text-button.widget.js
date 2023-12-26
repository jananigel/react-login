import { useCallback } from "react";
import './text-button.module.scss';

const TextButton = ({ text, btnClick }) => {
  const onBtnClick = useCallback(() => {
    btnClick && btnClick();
  }, [btnClick ?? null]);
  return (
    <button onClick={() => onBtnClick()}>{ text }</button>
  );
}

export default TextButton;