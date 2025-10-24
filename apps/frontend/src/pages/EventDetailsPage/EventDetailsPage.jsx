import { getEventById } from '../../data/dataHelper';
import './eventDetailsPage.css';

function EventDetailsPage() {
  const { id } = useParams();
  const event = getEventById(Number(id));

  if (!event) return <p>Event nije pronadjen.</p>;

  return (
    <div className="event-details-page">
      <h1>EventDetailsPage</h1>
    </div>
  );
}

export default EventDetailsPage;
