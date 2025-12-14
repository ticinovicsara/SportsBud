import { useSearchParams } from 'react-router-dom';
import { getAllEvents } from '../../data/dataHelper';

function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get('q')?.toLowerCase() || '';

  const events = getAllEvents();

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(query));

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search results</h2>

      {filteredEvents.length === 0 && <p>No results found.</p>}

      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default SearchResultsPage;
