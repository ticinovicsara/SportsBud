export function CreateButton({ text }) {
  const handleClick = () => {
    alert(`Dugme "${text}" je kliknuto`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );
}