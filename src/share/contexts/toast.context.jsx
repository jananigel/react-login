import { createContext, useContext, useState } from "react";
import { Toast } from "../components/toast/toast.component";
import { createPortal } from "react-dom";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
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
    setToasts([...toasts, {message}]);
  };

  const onCloseToast = (index) => {
    const updatedToasts = [...toasts];
    updatedToasts.splice(index, 1);
    setToasts(updatedToasts);
  }
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {!!toasts.length && createPortal(
        <div className={`container`} style={containerStyle}>
          {/* <Toast message={toast.message} onCloseClick={onCloseToast}/> */}
          {
            toasts.map((toast, index) => <Toast
              message={`${index}. ${toast.message}`}
              key={index + 1}
              timeout={3}
              index={index}
              onCloseClick={() => onCloseToast(index)}/>
            )
          }
        </div>
        , document.body
      )}
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  return useContext(ToastContext);
};