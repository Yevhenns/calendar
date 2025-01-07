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
                  <p>Holidays list</p>
                  <ul>
                    {filteredHolidays.map(item => (
                      <li key={nanoid()}>
                        {item.name} - {item.countryCode}
                      </li>
                    ))}
                  </ul>
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
  left: 0,
  top: 0,
  zIndex: 2,
  borderRadius: '4px',
  overflowY: 'scroll',
  overscrollBehavior: 'contain',
  height: '100%',
  fontSize: '14px',
});
