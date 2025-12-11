import styles from './inputField.module.css';

function InputField({ label, type = 'text', value, onChange, placeholder, name }) {
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
      />
    </div>
  );
}

export default InputField;
