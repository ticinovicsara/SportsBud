import { useSearchParams } from 'react-router-dom';
import { getAllEvents, getAllUsers } from '../../data/dataHelper';
import { EventCard } from '../../components';
import styles from './searchResultsPage.module.css';
import { Link } from 'react-router-dom';

function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const filters = {
    sport: params.get('sport') || '',
    location: params.get('location') || '',
    date: params.get('date') || '',
  };

  const allEvents = getAllEvents();
  const allUsers = getAllUsers();

  const { events: searchedEvents, users: searchedUsers } = filterBySearch(
    allEvents,
    allUsers,
    query
  );
  const { events: filteredEvents, users: filteredUsers } = filterByFilters(
    searchedEvents,
    searchedUsers,
    filters
  );

  return (
    <div className={styles['search-page']}>
      <h2 className={styles.heading}>
        Search results: <span className={styles['query']}>{query}</span>
      </h2>
      {filteredUsers.length > 0 ? (
        <>
          <h3 className={styles['heading-search']}>Users</h3>
          {filteredUsers.map((user) => (
            <div key={user.id} className={styles['participant-card']}>
              <div className={styles['profile-pic']}>
                <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
              </div>

              <p>
                {user.firstName} {user.lastName}
              </p>

              <Link to={`/profile/${user.id}`}>View profile</Link>
            </div>
          ))}
        </>
      ) : (
        <p>No users found.</p>
      )}

      {filteredEvents.length > 0 ? (
        <>
          <h3 className={styles['heading-search']}>Events</h3>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;

function filterBySearch(events, users, query) {
  if (!query) return { events, users };

  const q = query.toLowerCase();

  const filteredEvents = events.filter((event) => {
    const text = `
      ${event.title}
      ${event.description}
      ${event.location?.name}
      ${event.location?.address}
      ${event.sport?.name}
    `.toLowerCase();
    return text.includes(q);
  });

  const filteredUsers = users.filter((user) => {
    const text = `${user.firstName} ${user.lastName} ${user.username}`.toLowerCase();
    return text.includes(q);
  });

  return { events: filteredEvents, users: filteredUsers };
}

function filterByFilters(events, users, filters) {
  const filteredEvents = events.filter((event) => {
    const matchesSport = !filters.sport || event.sport?.id.toString() === filters.sport;
    const matchesLocation =
      !filters.location ||
      event.location?.name.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDate = !filters.date || event.date === filters.date;

    return matchesSport && matchesLocation && matchesDate;
  });

  const filteredUsers = users.filter((user) => {
    const matchesSport =
      !filters.sport || user.sports?.some((s) => s.sportId.toString() === filters.sport);
    const matchesLocation =
      !filters.location ||
      (user.location && user.location.toLowerCase().includes(filters.location.toLowerCase()));

    return matchesSport && matchesLocation;
  });

  return { events: filteredEvents, users: filteredUsers };
}
