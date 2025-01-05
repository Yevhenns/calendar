import { css } from '@emotion/css';
import { CalendarDay } from './CalendarDay';
import { DndContext } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

interface CalendarBodyBody {
  finalDaysArray?: CalendarMonth;
}

const monthWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const weekWrapper = css({
  display: 'flex',
  gap: '4px',
});

export function CalendarBody({ finalDaysArray }: CalendarBodyBody) {
  const [items, setItems] = useState<CalendarMonth>([]);

  const addTask = (dayId: string) => {
    const task = {
      id: nanoid(),
      text: nanoid(),
    };
    setItems(prevItems => {
      const updatedDays = prevItems.map(week => {
        return week.map(day => {
          if (day.id === dayId) {
            return { ...day, tasks: [...day.tasks, task] };
          }
          return day;
        });
      });
      return updatedDays;
    });
  };

  useEffect(() => {
    if (finalDaysArray) {
      setItems(finalDaysArray);
    }
  }, [finalDaysArray]);

  return (
    <DndContext>
      <div className={monthWrapper}>
        {items.map((item, index) => {
          return (
            <div key={index} className={weekWrapper}>
              {item.map((dayItem, index) => {
                return (
                  <CalendarDay
                    key={index}
                    dayItem={dayItem}
                    addTask={addTask}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
