import { getUserById, getEventById } from '../../data';
import styles from './eventParticipantsPage.module.css';
import { Link } from 'react-router-dom';

const EventParticipantsPage = ({ eventId }) => {
  const event = getEventById(1);
  if (!event) return <p>Event not found.</p>;
  if (event.participants.length === 0) {
    return <p>No participants found for this event.</p>;
  }

  const participants = event.participants;

  console.log(event.participants);

  return (
    <div className={styles['event-participants']}>
      <h2>Participants</h2>

      <div className={styles['participants-list']}>
        {participants.map((participant) => {
          const user = getUserById(participant.userId);

          if (!user) return null;

          return (
            <div key={participant.userId} className={styles['participant-card']}>
              <div className={styles['profile-pic']}>
                <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
              </div>

              <p>
                {user.firstName} {user.lastName}
              </p>

              <span>{participant.status}</span>

              <Link to={`/profile/${user.id}`}>View profile</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventParticipantsPage;
