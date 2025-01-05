import { CalendarBody, CalendarHead } from './components/calendar';
import { useCalendar } from './hooks/useCalendar';
import './App.css';
import { Button } from './components/shared/Button';
import { css } from '@emotion/css';

const navigation = css({
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  marginBottom: '16px',
});

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
        <Button onClick={decrementMonth}>Prev</Button>
        <h3>
          {currentMonthName} {year}
        </h3>
        <Button onClick={incrementMonth}>Next</Button>
      </div>
      <CalendarHead />
      <CalendarBody finalDaysArray={finalDaysArray} />
    </div>
  );
}

export default App;
