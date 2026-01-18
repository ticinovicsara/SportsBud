import { useUser } from '../../context/UserContext';
import { getUpcomingEvents } from '../../data';
import styles from './editMyEventsPage.module.css';
import { Link } from 'react-router-dom';

const EditMyEventsPage = () => {
  const { user } = useUser();
  const organiserId = 1;

  const allEvents = getUpcomingEvents();
  const myEvents = allEvents.filter((event) => event.organiserId === organiserId);

  return (
    <div className={styles['my-events-page']}>
      <h2 className={styles['page-title']}>My Events</h2>

      {myEvents.length === 0 ? (
        <p className={styles['empty-text']}>You haven’t created any events yet.</p>
      ) : (
        <div className={styles['events-grid']}>
          {myEvents.map((event) => (
            <div className={styles['event-card']} key={event.id}>
              <h3 className={styles['event-title']}>{event.title}</h3>

              <div className={styles['event-details']}>
                <div className={styles['time-location']}>
                  <p className={styles['event-date']}>
                    📅 {event.date} at {event.startTime}
                  </p>

                  <p className={styles['event-location']}>📍 {event.location.name}</p>
                </div>
                <button className={styles['edit-event-button']}>
                  <Link to={`/edit-event/${event.id}`} className={styles['edit-event-link']}>
                    Edit
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditMyEventsPage;
