interface CalendarDay {
  day: number;
  type: string;
  month: string;
}

type CalendarWeek = CalendarDay[];

type CalendarMonth = CalendarWeek[];
