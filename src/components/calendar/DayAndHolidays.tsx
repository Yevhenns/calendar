import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { css } from '@emotion/css';
import { nanoid } from 'nanoid';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { IconButton } from '../shared';

interface DayAndHolidaysProps {
  dayItem: CalendarDay;
  filteredHolidays: Holidays[];
}

export function DayAndHolidays({
  dayItem,
  filteredHolidays,
}: DayAndHolidaysProps) {
  const [holidaysShown, setHolidaysShown] = useState(false);

  const { day, month, type } = dayItem;

  const toggleHolidaysShown = () => {
    setHolidaysShown(prev => !prev);
  };

  const { ref } = useOnClickOutside(toggleHolidaysShown);

  return (
    <>
      {type === 'current' ? (
        <div className={dayAndHolidayWrapper}>
          <p>{day}</p>
          {filteredHolidays.length > 0 && (
            <>
              <div className={holidayWrapper}>
                <p>Holidays</p>
                <IconButton onClick={toggleHolidaysShown}>
                  <FaChevronDown />
                </IconButton>
              </div>
              {holidaysShown && (
                <div ref={ref} className={holidaysList}>
                  {filteredHolidays.map(item => (
                    <p key={nanoid()}>{item.name}</p>
                  ))}
                </div>
              )}
            </>
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
  position: 'relative',
  display: 'flex',
  gap: '4px',
});

const holidayWrapper = css({
  width: '100%',
  overflowY: 'scroll',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const holidaysList = css({
  width: '250px',
  backgroundColor: '#FFF',
  padding: '8px',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2,
  borderRadius: '4px',
});
