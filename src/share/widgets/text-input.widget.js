const TextInput = ({ placeholder, value, onChange, type = 'text' }) => {
  return (
    <>
      <label>
        <span>{ placeholder }</span>
        <input type={type} value={value} onChange={onChange}></input>
      </label>
    </>
  );
}

export default TextInput;