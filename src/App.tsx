import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { css } from '@emotion/css';

import './App.css';
import { CalendarBody, CalendarHead } from './components/calendar';
import { IconButton } from './components/shared/IconButton';
import { useCalendar } from './hooks/useCalendar';
import { fetchHolidays } from './utils/fetchHolidays';

const navigation = css({
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  marginBottom: '16px',
});

function App() {
  const [holidays, setHolidays] = useState<Holidays[]>([]);

  const {
    finalDaysArray,
    currentMonthName,
    year,
    incrementMonth,
    decrementMonth,
  } = useCalendar();

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
    <div>
      <div className={navigation}>
        <IconButton onClick={decrementMonth}>
          <FaChevronLeft size={24} />
        </IconButton>
        <h3>
          {currentMonthName} {year}
        </h3>
        <IconButton onClick={incrementMonth}>
          <FaChevronRight size={24} />
        </IconButton>
      </div>
      <CalendarHead />
      <CalendarBody finalDaysArray={finalDaysArray} holidays={holidays} />
    </div>
  );
}

export default App;
