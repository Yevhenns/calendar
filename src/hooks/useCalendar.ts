import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

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

  const prevMonthName = dayjs()
    .month(Number(currentMonth) - 2)
    .format('MMMM');
  const currentPrevMonth = dayjs()
    .month(Number(currentMonth) - 2)
    .format('MM');
  const prevMonth = new Date(year, Number(currentMonth) - 1);
  const prevMonthDaysCount = dayjs(prevMonth).daysInMonth();
  const prevMonthFirstDay = new Date(`${year}-${currentMonth}-01`);
  const prevYear = prevMonthFirstDay.getFullYear();

  const nextMonthFirstDay = new Date(`${year}-${currentMonth}-01`);
  const nextMonth = nextMonthFirstDay.getMonth() + 2;
  const nextYear = nextMonthFirstDay.getFullYear();

  const incrementMonth = () => {
    const firstDayOfMonth = new Date(`${year}-${currentMonth}-01`);
    const date = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + numberOfDays)
    );
    setDateToday(date);
  };

  const decrementMonth = () => {
    const firstDayOfMonth = new Date(`${year}-${currentMonth}-01`);
    const date = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - prevMonthDaysCount)
    );

    setDateToday(date);
  };

  useEffect(() => {
    const prevMonthDayArray = [];
    for (let i = prevMonthDaysCount; i > prevMonthDaysCount - firstDayIs; i--) {
      prevMonthDayArray.push({
        id: dayjs(`${prevYear}-${currentPrevMonth}-${i}`).format('YYYY-MM-DD'),
        day: i,
        type: 'prev',
        month: prevMonthName,
        tasks: [],
      });
    }

    const currentMonthDaysArray = [];
    for (let i = 1; i <= numberOfDays; i++) {
      currentMonthDaysArray.push({
        id: dayjs(`${year}-${currentMonth}-${i}`).format('YYYY-MM-DD'),
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

    const nextMonthName = dayjs().month(Number(currentMonth)).format('MMMM');

    if (nextMonthDays !== 7) {
      for (let i = 1; i <= nextMonthDays; i++) {
        finalDaysArray[finalDaysArray.length - 1].push({
          id: dayjs(`${nextYear}-${nextMonth}-${i}`).format('YYYY-MM-DD'),
          day: i,
          type: 'next',
          month: nextMonthName,
          tasks: [],
        });
      }
    }

    setFinalDaysArray(finalDaysArray as CalendarMonth);
  }, [
    currentMonth,
    currentMonthName,
    currentPrevMonth,
    firstDayIs,
    nextMonth,
    nextYear,
    numberOfDays,
    prevMonthDaysCount,
    prevMonthName,
    prevYear,
    year,
  ]);

  return {
    finalDaysArray,
    currentMonthName,
    year,
    incrementMonth,
    decrementMonth,
  };
}
