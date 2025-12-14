import { EventInfo } from '../EventDetails';
import styles from './eventCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../../components';

const EventCard = ({ event }) => {
  return (
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
  );
};

export default EventCard;
