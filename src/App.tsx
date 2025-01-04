import dayjs from 'dayjs';
import { CalendarBody } from './components/CalendarBody/CalendarBody';
import { CalendarHead } from './components/CalendarHead/CalendarHead';
import './App.css';

function App() {
  const dateToday = new Date();
  const year = dateToday.getFullYear();
  const currentMonth = (dateToday.getMonth() + 1).toString().padStart(2, '0');
  const currentMonthName = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(dateToday);

  const prevMonth = new Date(year, Number(currentMonth) - 1);
  const prevMonthDaysCount = dayjs(prevMonth).daysInMonth();

  const numberOfDays = dayjs(`${year}-${currentMonth}`).daysInMonth();
  const firstDayIs = dayjs(`${year}-${currentMonth}-01`).day();

  const prevMonthDayArray = [];
  for (let i = prevMonthDaysCount; i > prevMonthDaysCount - firstDayIs; i--) {
    prevMonthDayArray.push(i);
  }

  const currentMonthDaysArray = [];
  for (let i = 1; i <= numberOfDays; i++) {
    currentMonthDaysArray.push(i);
  }

  const PrevAndCurrentMonthDays = [
    ...prevMonthDayArray.reverse(),
    ...currentMonthDaysArray,
  ];

  const finalDaysArray = [];
  for (let i = 0; i <= PrevAndCurrentMonthDays.length; i += 7) {
    finalDaysArray.push(PrevAndCurrentMonthDays.slice(i, i + 7));
  }

  const nextMonthDays =
    finalDaysArray.length * 7 - finalDaysArray.flat().length;

  for (let i = 1; i <= nextMonthDays; i++) {
    finalDaysArray[finalDaysArray.length - 1].push(i);
  }

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
