import { getUserById } from '../../../../data';
import styles from './eventParticipantBox.module.css';

const EventParticipantBox = ({ participantId }) => {
  const participantData = getUserById(participantId);

  if (!participantData) return <p>Participant not found.</p>;

  return (
    <div className={styles['participant-card']}>
      <div className={styles['profile-pic']}>
        <img
          src={participantData.profileImage}
          alt={`${participantData.firstName} ${participantData.lastName}`}
        />
      </div>
      <p
        className={styles['participant-info']}
      >{`${participantData.firstName} ${participantData.lastName}`}</p>
    </div>
  );
};

export default EventParticipantBox;
