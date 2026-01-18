import { useSearchParams } from 'react-router-dom';
import { getAllEvents } from '../../data/dataHelper';
import { EventCard } from '../../components';
import styles from './searchResultsPage.module.css';

function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const filters = {
    sport: params.get('sport') || '',
    location: params.get('location') || '',
    date: params.get('date') || '',
  };

  const allEvents = getAllEvents();

  const searchResults = filterBySearch(allEvents, query);
  const filteredResults = filterByFilters(searchResults, filters);

  return (
    <div className={styles['search-page']}>
      <h2 className={styles.heading}>
        Search results: <span className={styles['query']}>{query}</span>
      </h2>

      {filteredResults.length === 0 && <p>No results found.</p>}

      {filteredResults.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default SearchResultsPage;

function filterBySearch(events, query) {
  if (!query) return events;
  const q = query.toLowerCase();
  return events.filter((event) => {
    const text = `
      ${event.title}
      ${event.description}
      ${event.location?.name}
      ${event.location?.address}
      ${event.sport?.name}
    `.toLowerCase();
    return !q || text.includes(q);
  });
}

function filterByFilters(events, filters) {
  return events.filter((event) => {
    const matchesSport = !filters.sport || event.sport?.id.toString() === filters.sport;
    const matchesLocation =
      !filters.location ||
      event.location?.name.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDate = !filters.date || event.date === filters.date;

    return matchesSport && matchesLocation && matchesDate;
  });
}
