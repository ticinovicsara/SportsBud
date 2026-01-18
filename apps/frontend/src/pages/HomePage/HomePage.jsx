import { Link } from 'react-router-dom';
import styles from './homePage.module.css';
import { SearchBar } from '../../components';
import { useState } from 'react';
import { getUpcomingEvents, getUserById } from '../../data';
import { toast } from 'react-toastify';

function HomePage() {
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const allEvents = getUpcomingEvents();

  const now = new Date();
  const upcomingEvents = allEvents.filter((event) => {
    const eventDateTime = new Date(`${event.date}T${event.startTime}`);
    return eventDateTime > now;
  });

  const topEvents = upcomingEvents.slice(0, 2);
  const remainingEvents = upcomingEvents.slice(2);

  const handleJoin = (eventTitle) => {
    toast.success(`Successfully joined ${eventTitle}! 🎉`, {});
  };

  return (
    <div className={styles['home-page']}>
      <SearchBar query={query} setQuery={setQuery} onFilterClick={() => setFilterOpen(true)} />

      <div className={styles['top-events-container']}>
        {topEvents.map((event) => (
          <div key={event.id} className={styles['top-card']}>
            <Link to={`/events/${event.id}`} className={styles['card-link']}>
              <h3 className={styles['title']}>{event.title}</h3>
              <div className={styles['time-location']}>
                <p className={styles['location']}>{event.location.name}</p>
                <p className={styles['time']}>{event.startTime}</p>
              </div>
              <p className={styles['joined']}>
                {event.currentPlayers}/{event.maxPlayers} players joined
              </p>
            </Link>
          </div>
        ))}
      </div>

      {remainingEvents.length > 0 && (
        <>
          <div className={styles['upcoming-row']}>
            <h2 className={styles['upcoming-text']}>Upcoming Events</h2>
            <span className={styles['see-all']}>
              <Link to="/events" className={styles['see-all-link']}>
                See All
              </Link>
            </span>
          </div>

          <div className={styles['cards-container']}>
            {remainingEvents.map((event) => {
              const organiser = getUserById(event.organiserId);
              return (
                <div key={event.id} className={styles['card']}>
                  <Link to={`/events/${event.id}`} className={styles['card-link']}>
                    <h3 className={styles['title']}>{event.title}</h3>
                    <div className={styles['time-location']}>
                      <p className={styles['location']}>{event.location.name}</p>
                      <p className={styles['time']}>
                        {event.date}, {event.startTime}
                      </p>
                    </div>
                    <p className={styles['spots-left']}>
                      {event.maxPlayers - event.currentPlayers} SPOTS LEFT
                    </p>
                    <p className={styles['description']}>{event.description}</p>

                    <div className={styles['host']}>
                      {organiser?.profileImage && (
                        <img src={organiser.profileImage} alt="host" className={styles['avatar']} />
                      )}
                      <span>{organiser?.firstName}</span>
                    </div>

                    <button
                      className={styles['join-button']}
                      onClick={() => handleJoin(event.title)}
                    >
                      Join
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}

      <button className={styles['edit-events-button']}>
        <Link to="/edit-events" className={styles['edit-events-link']}>
          {'Edit My Events'}
        </Link>
      </button>
    </div>
  );
}

export default HomePage;
