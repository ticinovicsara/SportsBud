import styles from './filterModal.module.css';
import { SPORTS } from '../../data';
import { useNavigate } from 'react-router-dom';

const FilterModal = ({ filters, setFilters, onClose }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    const searchParams = new URLSearchParams();
    if (filters.sport) searchParams.set('sport', filters.sport);
    if (filters.location) searchParams.set('location', filters.location);
    if (filters.date) searchParams.set('date', filters.date);

    navigate(`/search?${searchParams.toString()}`);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Filter events</h3>

        <div className={styles.field}>
          <label>Sport</label>
          <select
            value={filters.sport}
            onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
          >
            <option value="">All sports</option>
            {SPORTS.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.icon} {sport.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Location</label>
          <input
            placeholder="City"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.apply} onClick={handleApply}>
            Apply
          </button>
          <button
            className={styles.reset}
            onClick={() => setFilters({ sport: '', location: '', date: '' })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
