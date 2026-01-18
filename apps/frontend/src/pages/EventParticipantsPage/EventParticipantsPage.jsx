const EventParticipantsPage = (eventId) => {
  const fallbackId = 1;
  if (!eventId) {
    eventId = fallbackId;
  }

  return (
    <div>
      <h1>Event Participant</h1>
    </div>
  );
};

export default EventParticipantsPage;
