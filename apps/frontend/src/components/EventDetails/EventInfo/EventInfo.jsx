import styles from './eventInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { formatEventDateTime } from '../../../utils/dateFormatter';
import { getLocationDisplay } from '../../../utils/getLocation';
import { sportsImage } from '../../../assets/index';

const EventInfo = ({ event }) => {
  const eventDate = formatEventDateTime(event.date, event.startTime, event.endTime);
  const location = getLocationDisplay(event.location);
  return (
    <div className={styles['event-info']}>
      <img src={sportsImage} alt={event.title} className={styles['header-image']} />
      <h1 className={styles['title']}>{event.title}</h1>
      <div className={styles['common-info']}>
        <FontAwesomeIcon icon={faCalendar} className={styles['info-icon']} />
        <p>{eventDate}</p>
      </div>

      <div className={styles['common-info']}>
        <FontAwesomeIcon icon={faLocationArrow} className={styles['info-icon']} />
        <p>{location}</p>
      </div>
    </div>
  );
};

export default EventInfo;
