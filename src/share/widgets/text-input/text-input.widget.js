import styles from './text-input.module.scss';

const TextInput = ({ placeholder, value, onChange, type = 'text' }) => {
  return (
    <>
      <label className={styles.field}>
        <input className={styles.input} type={type} value={value} onChange={onChange}></input>
        <span className={styles.title}>{ value ? '' : placeholder }</span>
      </label>
    </>
  );
}

export default TextInput;