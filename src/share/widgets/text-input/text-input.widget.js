import React, { useRef } from 'react';
import styles from './text-input.module.scss';

const TextInput = React.forwardRef(({ placeholder, value, onChange, register, type = 'text' }, ref) => {
  return (
    <>
      <label className={styles.field}>
        <input className={styles.input} type={type} value={value} {...register} onChange={onChange}></input>
        <span className={styles.title}>{ value ? '' : placeholder }</span>
      </label>
    </>
  );
});

export default TextInput;