import { getEventById } from '../../data/dataHelper';
import styles from './eventDetailsPage.module.css';
import { sportsImage } from '../../assets';
import { useParams } from 'react-router-dom';
import { EventDescriptionCard, EventInfo, EventOrganizerCard } from '../../components';

function EventDetailsPage() {
  const { id } = useParams();
  const event = getEventById(Number(id));

  if (!event) return <p>Event nije pronadjen.</p>;

  return (
    <div className={styles['event-details-page']}>
      <img src={sportsImage} alt={event.title} className={styles['header-image']} />
      <div className={styles['content-header']}>
        <EventInfo event={event} />

        <EventDescriptionCard event={event} />

        <EventOrganizerCard organizerId={event.organiserId} />
      </div>
    </div>
  );
}

export default EventDetailsPage;
