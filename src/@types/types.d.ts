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
