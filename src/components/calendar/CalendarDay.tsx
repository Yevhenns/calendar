import { useState } from 'react';
import { Task } from '../task/Task';
import { nanoid } from 'nanoid';
import { css } from '@emotion/css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface CalendarDayProps {
  dayItem: CalendarDay;
}

export function CalendarDay({ dayItem }: CalendarDayProps) {
  const [items] = useState([
    { id: nanoid(), text: 'task1' },
    { id: nanoid(), text: 'task2' },
  ]);

  const { day, month, type } = dayItem;

  const dayWrapper = css({
    padding: '4px',
    textAlign: 'left',
    width: '150px',
    height: '150px',
    backgroundColor: type === 'current' ? '#FFEBCD' : '#F0F8FF',
    borderRadius: '4px',
  });

  const taskWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  });

  return (
    <div className={dayWrapper}>
      {type === 'current' ? (
        <p>{day}</p>
      ) : (
        <p>
          {day}, {month}
        </p>
      )}
      {type === 'current' && (
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className={taskWrapper}>
            {items.map(item => {
              return <Task key={nanoid()} item={item} />;
            })}
          </div>
        </SortableContext>
      )}
    </div>
  );
}
