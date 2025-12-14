import styles from './dropdownField.module.css';

function DropdownField({ label, name, value, onChange, options = [] }) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <select name={name} value={value} onChange={onChange} className={styles.select}>
        <option value="">Select...</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownField;
