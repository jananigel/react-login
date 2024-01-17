import { createPortal } from 'react-dom';
import TextButton from '../../../widgets/text-button/text-button.widget';
import styles from './password-generator.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import TextInput from '../../../widgets/text-input/text-input.widget';
import { PasswordGenerator } from '../../../../core/utils/password-generator';
import { useToastContext } from '../../../contexts/toast.context';

export const PasswordGeneratorModal = ({ onClose, id, onConfirm, isShow }) => {

  const modalRef = useRef(null);
  const [password, setPassword] = useState(PasswordGenerator());
  const [container] = useState(() => document.createElement('div'));
  const showToast = useToastContext();
  container.id = id;


  const onCancelClick = () => {
    modalRef.current.classList.remove(styles.show);
    modalRef.current.addEventListener('transitionend', () => {
      onClose();
    }, { once: true });
  }

  const onRandomClick = () => {
    setPassword(PasswordGenerator());
  }

  const onConfirmClick = () => {
    onConfirm(password);
  }

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(password);
    showToast(`Copied: ${password}`);
  }, [showToast]);

  useEffect(() => {
    // portals.appendChild(container);

    if (isShow) {
      setTimeout(() => {
        modalRef.current.classList.add(styles.show);
      }, 0);
    }

    return () => {
      // portals.removeChild(container);
      // modalRef.current.removeEventListener('transitionend');
    }
  }, [isShow]);

  return (
    <>
      {createPortal(
        <div ref={modalRef} className={styles.modal} id={id}>
          <div className={styles['back-drop']} onClick={onCancelClick}></div>
          <div className={styles['modal-content']}>
            <div className={styles.header}>
              <div className={styles.title}>
                Passsword Generator
              </div>
              <div className={styles['modal-actions']}>
                <span className={'icon-gear'}></span>
                <span className={'icon-copy'} onClick={onCopyClick}></span>
              </div>
            </div>
            <div className={styles.content}>
              <TextInput value={password} isReadOnly={true}/>
            </div>
            <div className={styles.footer}>
              <div className={styles.left}>
                <TextButton text={'Random'} btnClick={onRandomClick}/>
              </div>
              <div className={styles.right}>
                <TextButton text={'Confirm'} btnClick={() => onConfirmClick()}/>
                <TextButton text={'Cancel'} type={'secondary'} btnClick={onCancelClick}/>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}