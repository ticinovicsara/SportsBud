import styles from './eventInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { formatEventDateTime } from '../../../utils/dateFormatter';
import { getLocationDisplay } from '../../../utils/getLocation';
import { sportsImage } from '../../../assets/index';
import { useEffect, useState } from 'react';
import { isImageUrl } from '../../../utils';

const EventInfo = ({ event }) => {
  const eventDate = formatEventDateTime(event.date, event.startTime, event.endTime);
  const location = getLocationDisplay(event.location);
  const [imgSrc, setImgSrc] = useState(sportsImage);

  useEffect(() => {
    if (!event.imageUrl) return;

    isImageUrl(event.imageUrl).then((valid) => {
      if (valid) setImgSrc(event.imageUrl);
    });
  }, [event.imageUrl]);

  return (
    <div className={styles['event-info']}>
      <img
        src={event.imageUrl || sportsImage}
        onError={(e) => {
          e.currentTarget.src = sportsImage;
        }}
        className={styles['event-image']}
        alt={event.title}
      />

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
