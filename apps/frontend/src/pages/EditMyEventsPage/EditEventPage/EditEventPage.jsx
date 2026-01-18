import styles from './editEventPage.module.css';

const EditEventPage = (eventId) => {
  const fallbackId = 1;
  //   if (!eventId) {
  //     eventId = fallbackId;
  //   }

  return (
    <div>
      <h1>Edit Event Page for Event ID: {fallbackId}</h1>
    </div>
  );
};

export default EditEventPage;
