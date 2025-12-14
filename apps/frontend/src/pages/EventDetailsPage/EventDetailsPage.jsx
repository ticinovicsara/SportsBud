import { getEventById } from '../../data/dataHelper';
import styles from './eventDetailsPage.module.css';
import { useParams } from 'react-router-dom';
import {
  EventDescriptionCard,
  EventInfo,
  EventOrganizerCard,
  EventParticipantsCard,
  SubmitButton,
} from '../../components';
import { toast } from 'react-toastify';
import { useState } from 'react';

function EventDetailsPage() {
  const { id } = useParams();
  const event = getEventById(Number(id));
  const [isJoined, setIsJoined] = useState(false);

  if (!event) return <p>Event nije pronadjen.</p>;

  function handleJoinEvent() {
    if (!isJoined) {
      toast.success('You have successfully joined the event!');
    } else {
      toast.info('You have canceled your attendance.');
    }

    setIsJoined(!isJoined);
  }

  return (
    <div className={styles['event-details-page']}>
      <div className={styles['content-header']}>
        <EventInfo event={event} />

        <EventDescriptionCard event={event} />

        <EventOrganizerCard organizerId={event.creatorId} />

        <EventParticipantsCard participants={event.participants} maxPlayers={event.maxPlayers} />
      </div>

      <SubmitButton variant={isJoined ? 'cancel-event' : 'primary'} onClick={handleJoinEvent}>
        {isJoined ? 'Cancel Event' : 'Join Event'}
      </SubmitButton>
    </div>
  );
}

export default EventDetailsPage;
