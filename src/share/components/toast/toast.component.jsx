import React, { useCallback, useEffect, useState } from 'react';
import styles from './toast.module.scss';

const Toast = React.memo(({message, onCloseClick, timeout, index, type = 'normal'}) => {

  const [timer, setTimer] = useState(timeout);

  const progressBarStyle = {
    background: `linear-gradient(90deg, var(--primary-color) ${100 - (timer / timeout) * 100}%, #fff ${100 - (timer / timeout) * 100}%)`,
  };

  const toastOpacity = {
    opacity: timer / timeout,
  }

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      
      const progress = Math.min(1, (timestamp - startTime) / (timeout * 1000));
      setTimer(timeout - progress * timeout);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        onCloseClick(index);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [index]);

  const closeClick = (index) => {
    onCloseClick(index);
  }

  return (
    <>
      <div className={`${styles['toast']}`}>
        <div className={`${styles['toast-content']}`} style={toastOpacity}>
          <div className={`${styles.message}`}>{ message }</div>
          <div className={`${styles.close}`} onClick={() => closeClick(index)}>X</div>
          <div className={`${styles['progress-bar']}`} style={progressBarStyle}></div>
        </div>
      </div>
    </>
  )
});

export default Toast;