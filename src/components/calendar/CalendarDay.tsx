import { Task } from '../task/Task';
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
        <div className={taskWrapper}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(item => (
              <Task key={item.id} item={item} />
            ))}
          </SortableContext>
        </div>
      )}
      <button onClick={addNewTask} type="button">
        add
      </button>
    </div>
  );
}
