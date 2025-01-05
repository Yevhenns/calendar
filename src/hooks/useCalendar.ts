import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function useCalendar() {
  const [finalDaysArray, setFinalDaysArray] = useState<CalendarMonth>();
  const [dateToday, setDateToday] = useState(new Date());

  const currentMonth = (dateToday.getMonth() + 1).toString().padStart(2, '0');
  const currentMonthName = dayjs()
    .month(Number(currentMonth) - 1)
    .format('MMMM');
  const year = dateToday.getFullYear();
  const numberOfDays = dayjs(`${year}-${currentMonth}`).daysInMonth();
  const firstDayIs = dayjs(`${year}-${currentMonth}-01`).day();

  const prevMonthDate = dayjs()
    .month(Number(currentMonth) - 2)
    .format('MMMM');
  const prevMonth = new Date(year, Number(currentMonth) - 1);
  const prevMonthDaysCount = dayjs(prevMonth).daysInMonth();

  const incrementMonth = () => {
    const firstDayOfMonth = new Date(`${year}-${currentMonth}-01`);
    const date = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + numberOfDays)
    );
    console.log(date);
    setDateToday(date);
  };

  const decrementMonth = () => {
    const firstDayOfMonth = new Date(`${year}-${currentMonth}-01`);
    const date = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - prevMonthDaysCount)
    );
    console.log(date);
    setDateToday(date);
  };

  useEffect(() => {
    const prevMonthDayArray = [];
    for (let i = prevMonthDaysCount; i > prevMonthDaysCount - firstDayIs; i--) {
      prevMonthDayArray.push({
        id: `${i}-${prevMonthDate}`,
        day: i,
        type: 'prev',
        month: prevMonthDate,
        tasks: [],
      });
    }

    const currentMonthDaysArray = [];
    for (let i = 1; i <= numberOfDays; i++) {
      currentMonthDaysArray.push({
        id: `${i}-${currentMonthName}`,
        day: i,
        type: 'current',
        month: currentMonthName,
        tasks: [],
      });
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

    const nextMonthDate = dayjs().month(Number(currentMonth)).format('MMMM');

    for (let i = 1; i <= nextMonthDays; i++) {
      finalDaysArray[finalDaysArray.length - 1].push({
        id: `${i}-${nextMonthDate}`,
        day: i,
        type: 'next',
        month: nextMonthDate,
        tasks: [],
      });
    }

    setFinalDaysArray(finalDaysArray as CalendarMonth);
  }, [
    currentMonth,
    currentMonthName,
    firstDayIs,
    numberOfDays,
    prevMonthDate,
    prevMonthDaysCount,
  ]);

  return {
    finalDaysArray,
    currentMonthName,
    year,
    incrementMonth,
    decrementMonth,
  };
}
