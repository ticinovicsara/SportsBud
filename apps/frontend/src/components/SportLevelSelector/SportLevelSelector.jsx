import styles from './sportLevelSelector.module.css';
import { SPORTS, EXPERIENCE_LEVELS } from '../../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';

export default function SportLevelSelector({ sports, onChange }) {
  function handleSportFieldChange(index, field, value) {
    const updated = [...sports];
    updated[index][field] = value;

    if (field === 'sportId') {
      const sport = SPORTS.find((s) => s.id === parseInt(value));
      updated[index].sportName = sport ? sport.name : '';
    }

    onChange(updated);
  }

  function addSport() {
    onChange([...sports, { sportId: '', sportName: '', level: '' }]);
  }

  function removeSport(index) {
    const updated = sports.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div className={styles.container}>
      <h3>Sports</h3>

      {sports.map((sport, index) => (
        <div key={index} className={styles.row}>
          <select
            value={sport.sportId}
            onChange={(e) => handleSportFieldChange(index, 'sportId', e.target.value)}
          >
            <option value="">Select sport</option>
            {SPORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.icon} {s.name}
              </option>
            ))}
          </select>

          <select
            value={sport.level}
            onChange={(e) => handleSportFieldChange(index, 'level', e.target.value)}
          >
            <option value="">Select level</option>
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => removeSport(index)} className={styles.removeBtn}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      ))}

      <button type="button" onClick={addSport} className={styles.addBtn}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add Sport</p>
      </button>
    </div>
  );
}
