import InputField from '../InputField/InputField';
import styles from './searchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterModal from '../FilterModal/FilterModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchBar = ({ query, setQuery, filterOpen, setFilterOpen }) => {
  const [filters, setFilters] = useState({
    dateRange: null,
    location: '',
    sportType: '',
    maxPlayers: null,
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      toast.info('Enter a search term');
      return;
    }

    console.log('Search query:', query);
    console.log('Filters:', filters);

    navigate(`/search?q=${query}&filters=${encodeURIComponent(JSON.stringify(filters))}`);
  };

  return (
    <>
      <div className={styles.searchBar}>
        <InputField
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          noMargin
        />

        <button onClick={() => setFilterOpen(true)} className={styles.filterBtn}>
          <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
        </button>
      </div>
      {filterOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onApply={handleSearch}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </>
  );
};

export default SearchBar;
