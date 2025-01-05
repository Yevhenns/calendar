import { CalendarBody, CalendarHead } from './components/calendar';
import { useCalendar } from './hooks/useCalendar';
import './App.css';

function App() {
  const { finalDaysArray, currentMonthName, year } = useCalendar();

  return (
    <div>
      <h3>
        {currentMonthName} {year}
      </h3>
      <CalendarHead />
      <CalendarBody finalDaysArray={finalDaysArray} />
    </div>
  );
}

export default App;
