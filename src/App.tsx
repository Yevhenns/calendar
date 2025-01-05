import { CalendarBody } from './components/CalendarBody/CalendarBody';
import { CalendarHead } from './components/CalendarHead/CalendarHead';
import './App.css';
import { useCalendar } from './hooks/useCalendar';

function App() {
  const { finalDaysArray, currentMonthName, year } = useCalendar();

  return (
    <div>
      <p>
        {currentMonthName} {year}
      </p>
      <CalendarHead />
      <CalendarBody finalDaysArray={finalDaysArray} />
    </div>
  );
}

export default App;
