import { useSearchParams } from 'react-router-dom';
import { getAllEvents } from '../../data/dataHelper';
import { EventCard } from '../../components';
import styles from './searchResultsPage.module.css';

function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get('q')?.toLowerCase() || '';
  const filters = JSON.parse(params.get('filters') || '{}');
  const events = getAllEvents();

  const filtered = events.filter((event) => {
    const searchText = `
    ${event.title}
    ${event.description}
    ${event.location?.name}
    ${event.location?.address}
    ${event.sport?.name}
  `.toLowerCase();

    const matchesQuery = !query || searchText.includes(query);

    const matchesSport = !filters.sportType || event.sport?.id === filters.sportType;

    const matchesLocation =
      !filters.location || searchText.includes(filters.location.toLowerCase());

    return matchesQuery && matchesSport && matchesLocation;
  });

  return (
    <div className={styles['search-page']}>
      <h2 className={styles.heading}>
        Search results for: <span className={styles['query']}>{query}</span>
      </h2>

      {filtered.length === 0 && <p>No results found.</p>}

      {filtered.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default SearchResultsPage;
