import styles from './toast.module.scss';

export const Toast = ({message, onCloseClick, type = 'normal'}) => {

  return (
    <>
      <div className={`${styles['toast']}`}>
        <div className={`${styles.message}`}>{ message }</div>
        <div className={`${styles.close}`} onClick={onCloseClick}>X</div>
      </div>
    </>
  )
}