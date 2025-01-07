import { css } from '@emotion/css';
import { nanoid } from 'nanoid';

interface DayAndHolidaysProps {
  dayItem: CalendarDay;
  filteredHolidays: Holidays[];
}

export function DayAndHolidays({
  dayItem,
  filteredHolidays,
}: DayAndHolidaysProps) {
  const { day, month, type } = dayItem;

  return (
    <>
      {type === 'current' ? (
        <div className={dayAndHolidayWrapper}>
          <p>{day}</p>
          {filteredHolidays.length > 0 && (
            <div className={holidayWrapper}>
              {filteredHolidays.map(item => (
                <p key={nanoid()}>{item.name}</p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>
          {day}, {month}
        </p>
      )}
    </>
  );
}

const dayAndHolidayWrapper = css({
  display: 'flex',
  gap: '4px',
});

const holidayWrapper = css({
  overflowY: 'scroll',
  height: '24px',
});
