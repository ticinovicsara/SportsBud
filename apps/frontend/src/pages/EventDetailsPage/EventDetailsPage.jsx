import { getEventById } from '../../data/dataHelper';
import styles from './eventDetailsPage.module.css';
import { sportsImage } from '../../assets';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { formatEventDateTime, getLocationDisplay } from '../../utils';

function EventDetailsPage() {
  const { id } = useParams();
  const event = getEventById(Number(id));

  if (!event) return <p>Event nije pronadjen.</p>;

  const eventDate = formatEventDateTime(event.date, event.startTime, event.endTime);
  const location = getLocationDisplay(event.location);

  return (
    <div className={styles['event-details-page']}>
      <img src={sportsImage} alt={event.title} className={styles['header-image']} />
      <div className={styles['content-header']}>
        <div className={styles['event-info']}>
          <h1>{event.title}</h1>
          <div>
            <div className={styles['common-info']}>
              <FontAwesomeIcon icon={faCalendar} className={styles['info-icon']} />
              <p>{eventDate}</p>
            </div>

            <div className={styles['common-info']}>
              <FontAwesomeIcon icon={faLocationArrow} className={styles['info-icon']} />
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
