import InputField from '../InputField/InputField';
import styles from './searchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterModal from '../FilterModal/FilterModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ query, setQuery, filterOpen, setFilterOpen }) => {
  const [filters, setFilters] = useState({
    dateRange: null,
    location: '',
    sportType: '',
    maxPlayers: null,
  });

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.searchBar}>
        <InputField
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/search?q=${query}`);
            }
          }}
        />

        <button onClick={() => setFilterOpen(true)} className={styles.filterBtn}>
          <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
        </button>
      </div>
      {filterOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
};

export default SearchBar;
