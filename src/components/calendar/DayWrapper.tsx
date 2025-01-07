import { css } from '@emotion/css';
import dayjs from 'dayjs';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface DayWrapperProps {
  children: React.ReactNode;
  type: CalendarDay['type'];
  index: number;
  id: string;
  rejectAddNewTask: () => void;
}

export function DayWrapper({
  children,
  type,
  index,
  id,
  rejectAddNewTask,
}: DayWrapperProps) {
  const SATURDAY = 6;
  const SUNDAY = 0;
  const isWeekend = index === SATURDAY || index === SUNDAY;
  const isDayToday = dayjs().format('YYYY-MM-DD') === id;

  const { ref } = useOnClickOutside(rejectAddNewTask);

  return (
    <div ref={ref} className={dayWrapper({ type, isDayToday, isWeekend })}>
      {children}
    </div>
  );
}

const dayWrapper = ({
  type,
  isDayToday,
  isWeekend,
}: {
  type: CalendarDay['type'];
  isDayToday: boolean;
  isWeekend: boolean;
}) =>
  css({
    padding: '4px',
    textAlign: 'left',
    width: '200px',
    height: '300px',
    ...(type === 'current'
      ? {
          backgroundColor: '#FFEBCD',
        }
      : {
          backgroundColor: '#F0F8FF',
        }),
    ...(isDayToday && {
      backgroundColor: '#DCDCDC',
      border: '1px solid #000',
    }),
    ...(isWeekend &&
      !isDayToday && {
        backgroundColor: '#90EE90',
      }),
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    position: 'relative',
  });
