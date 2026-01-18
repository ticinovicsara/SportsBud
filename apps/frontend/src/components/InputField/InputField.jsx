import styles from './inputField.module.css';

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  onKeyDown,
  placeholder,
  name,
  readOnly = false,
  noMargin = false,
}) {
  return (
    <div className={`${styles.container} ${noMargin ? styles.noMargin : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={styles.input}
        readOnly={readOnly}
      />
    </div>
  );
}

export default InputField;
