interface CalendarDay {
  id: string;
  day: number;
  type: 'prev' | 'current' | 'next';
  month: string;
  tasks: Task[];
}

interface Task {
  id: string;
  text: string;
}

type CalendarWeek = CalendarDay[];

type CalendarMonth = CalendarWeek[];

interface Holidays {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: null;
  launchYear: null;
  types: [string];
}
