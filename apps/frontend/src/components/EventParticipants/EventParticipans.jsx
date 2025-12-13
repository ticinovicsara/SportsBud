const EventParticipants = ({ participants, maxPlayers }) => {
  const confirmed = participants.filter((p) => p.status === 'confirmed');

  return (
    <section>
      <h3>
        Participants ({confirmed.length}/{maxPlayers})
      </h3>

      <div>
        {confirmed.map((p) => (
          <div key={p.userId}>User #{p.userId}</div>
        ))}
      </div>
    </section>
  );
};

export default EventParticipants;
