import styles from './eventParticipantsCard.module.css';
import EventParticipantBox from './EventParticipantBox/EventParticipantBox.jsx';
import { Link } from 'react-router-dom';

const EventParticipants = ({ participants, maxPlayers }) => {
  const confirmed = participants.filter((p) => p.status === 'confirmed');

  return (
    <div className={styles['event-participants-card']}>
      <h3>
        Participants ({confirmed.length}/{maxPlayers})
      </h3>

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
