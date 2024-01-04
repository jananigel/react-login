import React, { useRef } from 'react';
import styles from './text-input.module.scss';

const TextInput = React.forwardRef(({ isReadOnly, placeholder, value, onChange, register, isInvalid, className, type = 'text', }, ref) => {
  
  return (
    <>
      <label className={`${styles.field} ${className} ${isInvalid && styles.invalid}`}>
        <input readOnly={!!isReadOnly} className={styles.input} type={type} value={value} {...register} onChange={onChange}></input>
        <span className={(styles.title) + " " + (value ? styles.active : '')}>{ value ? placeholder : placeholder }</span>
      </label>
    </>
  );
});

export default TextInput;