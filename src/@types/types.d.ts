interface CalendarDay {
  day: number;
  type: 'prev' | 'current' | 'next';
  month: string;
}

type CalendarWeek = CalendarDay[];

type CalendarMonth = CalendarWeek[];
