import styles from './eventParticipantsCard.module.css';
import EventParticipantBox from './EventParticipantBox/EventParticipantBox.jsx';
import { Link } from 'react-router-dom';

const EventParticipants = ({ participants, maxPlayers, eventId }) => {
  const confirmed = participants.filter((p) => p.status === 'confirmed');

  return (
    <div className={styles['event-participants-card']}>
      <div className={styles['participant-container']}>
        <h3>
          Confirmed Participants ({confirmed.length}/{maxPlayers})
        </h3>

        <Link to={`/events/${eventId}/participants`} className={styles['view-link']}>
          View all
        </Link>
      </div>

      <div className={styles['participants-grid']}>
        {confirmed.map((p) => (
          <div key={p.userId}>
            <Link to={`/profile/${p.userId}`} className={styles['participant-link']} key={p.userId}>
              <EventParticipantBox participantId={p.userId} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventParticipants;
