import styles from './screen-center.module.scss';

const ScreenCenterLayout = ({ children }) => {

  return (
    <div className={styles.container}>
      { children }
    </div>
  );
}

export default ScreenCenterLayout;