const getLocationDisplay = (location) => {
  if (!location) return 'Lokacija nije dostupna';

  const city = location.address.split(',')[2]?.trim() || '';
  return `${location.name}, ${city}`;
};

export { getLocationDisplay };
