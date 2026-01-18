import { EventCard } from '../../components';
import styles from './eventsPage.module.css';
import { getAllEvents } from '../../data/dataHelper';

function EventsPage() {
  return (
    <div className={styles['events-page']}>
      {getAllEvents().map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventsPage;
