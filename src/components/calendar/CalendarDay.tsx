import { Task } from '../task/Task';
import { nanoid } from 'nanoid';
import { css } from '@emotion/css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface CalendarDayProps {
  dayItem: CalendarDay;
  addTask: (dayId: string) => void;
}

const dayWrapper = (type: CalendarDay['type']) =>
  css({
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

export function CalendarDay({ dayItem, addTask }: CalendarDayProps) {
  console.log(dayItem);

  const { id, day, month, type, tasks } = dayItem;

  const addNewTask = () => {
    addTask(id);
  };

  return (
    <div className={dayWrapper(type)}>
      {type === 'current' ? (
        <p>{day}</p>
      ) : (
        <p>
          {day}, {month}
        </p>
      )}
      {type === 'current' && (
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className={taskWrapper}>
            {tasks.map(item => {
              return <Task key={nanoid()} item={item} />;
            })}
          </div>
        </SortableContext>
      )}
      <button onClick={addNewTask} type="button">
        add
      </button>
    </div>
  );
}
