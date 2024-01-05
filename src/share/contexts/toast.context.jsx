import { createContext, useContext, useState } from "react";
import { Toast } from "../components/toast/toast.component";
import { createPortal } from "react-dom";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [timer, setTimer] = useState(undefined);
  const containerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'column',
    gridGap: '20px',
    padding: '20px 0',
  }

  const showToast = (message) => {
    setToast({ message });
    setTimer(setTimeout(() => {
      setToast(null);
      resetTimer();
    }, 3000));
  };

  const onCloseToast = () => {
    setToast(null);
    resetTimer();
  }

  const resetTimer = () => {
    clearTimeout(timer);
    setTimer(undefined);
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && createPortal(
        <div className={`container`} style={containerStyle}>
          <Toast message={toast.message} onCloseClick={onCloseToast}/>
        </div>
        , document.body
      )}
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  return useContext(ToastContext);
};