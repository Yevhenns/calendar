export const fetchHolidays = async () => {
  try {
    const response = await fetch(
      'https://date.nager.at/api/v3/NextPublicHolidaysWorldwide'
    );
    const data = await response.json();
    return data as Holidays[];
  } catch (error) {
    console.error(error);
  }
};
