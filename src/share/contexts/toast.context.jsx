import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Toast from "../components/toast/toast.component";
import { createPortal } from "react-dom";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [removeToast, setRemoveToast] = useState('');
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
    const key = Date.now().toString();
    setToasts([...toasts, {message, key}]);
  };

  const onCloseToast = useCallback((key) => {
    setRemoveToast(key);
  }, []);

  const memoizedToasts = useMemo(() => (
    toasts.map((toast, index) => (
      <Toast
        message={`${toast.message}`}
        key={toast.key}
        timeout={3}
        index={toast.key}
        onCloseClick={() => onCloseToast(toast.key)}
      />
    ))
  ), [toasts, onCloseToast, setToasts]);

  useEffect(() => {
    setToasts(toasts.filter((toast) => toast.key !== removeToast));
  }, [removeToast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {!!toasts.length && createPortal(
        <div className={`container`} style={containerStyle}>
          { memoizedToasts }
        </div>
        , document.body
      )}
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  return useContext(ToastContext);
};