import { EventInfo } from '../EventDetails';
import styles from './eventCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../../components';
import { getSportById } from '../../data/dataHelper';

const EventCard = ({ event }) => {
  if (!event || !event.sport) return null;

  const sport = getSportById(event.sport.id);

  return (
    <div key={event.id} className={styles['event-card']}>
      <EventInfo key={event.id} event={event} />
      <div className={styles['additional-content']}>
        <FontAwesomeIcon icon={faPeopleGroup} className={styles['icon']} />
        <p>
          {event.currentPlayers} / {event.maxPlayers}
        </p>
      </div>
      <div className={styles['sport-info']}>
        <span className={styles['icon']}>{sport.icon}</span>
        <span>{sport.name}</span>
      </div>
      <Link to={`/events/${event.id}`}>
        <SubmitButton variant="primary">View Details</SubmitButton>
      </Link>
    </div>
  );
};

export default EventCard;
