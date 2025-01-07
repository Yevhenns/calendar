import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { css } from '@emotion/css';

import './App.css';
import { Calendar } from './components/calendar';
import { IconButton } from './components/shared/IconButton';
import { useCalendar } from './hooks/useCalendar';

function App() {
  const {
    finalDaysArray,
    currentMonthName,
    year,
    incrementMonth,
    decrementMonth,
  } = useCalendar();

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
      <Calendar finalDaysArray={finalDaysArray} />
    </div>
  );
}

export default App;

const navigation = css({
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  marginBottom: '16px',
});
