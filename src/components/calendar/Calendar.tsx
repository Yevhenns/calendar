import { useEffect, useState } from 'react';

import { fetchHolidays } from '../../utils/fetchHolidays';
import { Filter } from '../task';
import { CalendarBody } from './CalendarBody';
import { CalendarHead } from './CalendarHead';

interface CalendarProps {
  finalDaysArray?: CalendarMonth;
}

export function Calendar({ finalDaysArray }: CalendarProps) {
  const [holidays, setHolidays] = useState<Holidays[]>([]);
  const [filter, setFilter] = useState('');

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

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
      <Filter handleFilter={handleFilter} />
      <CalendarHead />
      <CalendarBody finalDaysArray={finalDaysArray} holidays={holidays} />
    </>
  );
}
