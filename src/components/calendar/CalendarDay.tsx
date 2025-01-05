import { css } from '@emotion/css';

interface CalendarDayProps {
  dayItem: CalendarDay;
}

export function CalendarDay({ dayItem }: CalendarDayProps) {
  const { day, month, type } = dayItem;

  const dayWrapper = (type: CalendarDay['type']) =>
    css({
      padding: '4px',
      textAlign: 'left',
      width: '150px',
      height: '150px',
      backgroundColor: type === 'current' ? '#FFEBCD' : '#F0F8FF',
      borderRadius: '4px',
    });

  return (
    <div className={dayWrapper(type)}>
      {type === 'current' ? (
        <p>{day}</p>
      ) : (
        <p>
          {day}, {month}
        </p>
      )}
    </div>
  );
}
