import { EventInfo, SubmitButton } from '../../components';
import styles from './eventsPage.module.css';
import { EVENTS } from '../../data';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

function EventsPage() {
  return (
    <div className={styles['events-page']}>
      {EVENTS.map((event) => (
        <div key={event.id} className={styles['event-card']}>
          <EventInfo key={event.id} event={event} />
          <div className={styles['additional-content']}>
            <FontAwesomeIcon icon={faPeopleGroup} className={styles['icon']} />
            <p>
              {event.currentPlayers} / {event.maxPlayers}
            </p>
          </div>
          <Link to={`/events/${event.id}`}>
            <SubmitButton variant="primary">View Details</SubmitButton>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default EventsPage;
