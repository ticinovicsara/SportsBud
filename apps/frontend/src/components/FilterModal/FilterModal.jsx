import styles from './filterModal.module.css';

const FilterModal = ({ filters, setFilters, onClose }) => {
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
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
            <option value="basketball">Basketball</option>
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
          <button className={styles.apply} onClick={onClose}>
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
