import styles from './eventDescriptionCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faTag } from '@fortawesome/free-solid-svg-icons';

const EventDescriptionCard = ({ event }) => {
  if (!event) return null;

  return (
    <div className={styles['event-description-card']}>
      <h2>Event description</h2>
      <p className={styles['description']}>{event.description}</p>
      <div className={styles['additional-content']}>
        <FontAwesomeIcon icon={faPeopleGroup} className={styles['icon']} />
        <p>
          {event.currentPlayers} / {event.maxPlayers}
        </p>
      </div>

      <div className={styles['additional-content']}>
        <FontAwesomeIcon icon={faTag} className={styles['icon']} />
        <p>{Array.isArray(event.tags) ? event.tags.join(', ') : event.tags || 'No tags'}</p>
      </div>
    </div>
  );
};

export default EventDescriptionCard;
