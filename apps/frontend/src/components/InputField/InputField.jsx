import styles from './inputField.module.css';

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  readOnly = false,
}) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        readOnly={readOnly}
      />
    </div>
  );
}

export default InputField;
