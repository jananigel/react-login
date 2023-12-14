import { useCallback } from "react";

const TextButton = ({ text, btnClick }) => {
  const onBtnClick = useCallback(() => {
    btnClick();
  }, [btnClick]);
  return (
    <button onClick={() => onBtnClick()}>{ text }</button>
  );
}

export default TextButton;