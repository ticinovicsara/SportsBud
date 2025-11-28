import "./createEventPage.css";
import { CreateButton } from '../../components/CreateButton';

function CreateEventPage() {
  return (
    <div className="create-event-page">
      <h1>CreateEventPage</h1>
      <h2>novi naslov</h2>

     {/* Sticky gumb */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <CreateButton text="Klikni me" />
      </div>
    </div>
  );
}

export default CreateEventPage;
