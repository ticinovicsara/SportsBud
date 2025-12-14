import styles from './eventParticipantsCard.module.css';
import EventParticipantBox from './EventParticipantBox/EventParticipantBox.jsx';

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
            <EventParticipantBox participantId={p.userId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventParticipants;
