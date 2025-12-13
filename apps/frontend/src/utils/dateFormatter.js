export const formatEventDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

export const formatEventDateTime = (dateString, startTime, endTime) => {
  const formattedDate = formatEventDate(dateString);
  return `${formattedDate} • ${startTime} - ${endTime}`;
};
