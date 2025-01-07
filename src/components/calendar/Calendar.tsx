import { useEffect, useState } from 'react';

import { fetchHolidays } from '../../utils/fetchHolidays';
import { CalendarBody } from './CalendarBody';
import { CalendarHead } from './CalendarHead';

interface CalendarProps {
  finalDaysArray?: CalendarMonth;
}

export function Calendar({ finalDaysArray }: CalendarProps) {
  const [holidays, setHolidays] = useState<Holidays[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHolidays();
      if (data) {
        setHolidays(data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CalendarHead />
      <CalendarBody finalDaysArray={finalDaysArray} holidays={holidays} />
    </>
  );
}
