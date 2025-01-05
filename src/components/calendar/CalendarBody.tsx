import { css } from '@emotion/css';
import { CalendarDay } from './CalendarDay';
import { DndContext } from '@dnd-kit/core';

interface CalendarBodyBody {
  finalDaysArray?: CalendarMonth;
}

export function CalendarBody({ finalDaysArray }: CalendarBodyBody) {
  const monthWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  });

  const weekWrapper = css({
    display: 'flex',
    gap: '4px',
  });

  return (
    <DndContext>
      <div className={monthWrapper}>
        {finalDaysArray?.map((item, index) => {
          return (
            <div key={index} className={weekWrapper}>
              {item.map((dayItem, index) => {
                return <CalendarDay key={index} dayItem={dayItem} />;
              })}
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
