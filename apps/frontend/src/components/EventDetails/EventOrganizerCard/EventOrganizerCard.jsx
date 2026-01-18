import { getUserById } from '../../../data';
import styles from './eventOrganizerCard.module.css';
import { Link } from 'react-router-dom';

const EventOrganizerCard = ({ organizerId }) => {
  const organizer = getUserById(organizerId);

  if (!organizer) return <p>Organizer not found.</p>;

  return (
    <div className={styles['event-organizer-card']}>
      <h2>Organizer</h2>
      <div className={styles['profile-container']}>
        <div className={styles['profile-details']}>
          <div className={styles['profile-pic']}>
            <img
              src={organizer.profileImage}
              alt={`${organizer.firstName} ${organizer.lastName}`}
            />
          </div>
          <p>
            {organizer.firstName} {organizer.lastName}
          </p>
        </div>
        <Link to={`/profile/${organizerId}`} className={styles['view-profile-link']}>
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EventOrganizerCard;
