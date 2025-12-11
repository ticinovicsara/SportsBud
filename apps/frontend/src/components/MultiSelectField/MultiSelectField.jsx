import { useState } from 'react';
import styles from './multiSelectField.module.css';

function MultiSelectField({ label, name, value = [], onChange, options = [] }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionValue) => {
    let updated;

    if (value.includes(optionValue)) {
      updated = value.filter((v) => v !== optionValue);
    } else {
      updated = [...value, optionValue];
    }

    onChange({
      target: {
        name,
        value: updated,
      },
    });
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.selector} onClick={() => setOpen((prev) => !prev)}>
        {value.length > 0
          ? value.map((v) => options.find((o) => o.value === v)?.label).join(', ')
          : 'Select sports...'}
      </div>

      {open && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <label key={opt.value} className={styles.option}>
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => handleSelect(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectField;
