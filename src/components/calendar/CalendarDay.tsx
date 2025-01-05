import { useState } from 'react';
import { Task } from '../task/Task';
import { css } from '@emotion/css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Button } from '../shared/Button';

interface CalendarDayProps {
  dayItem: CalendarDay;
  addTask: (dayId: string, value: string) => void;
}

const dayWrapper = (type: CalendarDay['type']) =>
  css({
    padding: '4px',
    textAlign: 'left',
    width: '150px',
    height: '150px',
    backgroundColor: type === 'current' ? '#FFEBCD' : '#F0F8FF',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  });

const taskWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    width: '0px',
    height: '0px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
});

const buttonSet = css({
  display: 'flex',
  gap: '8px',
  justifyContent: 'end',
});

const btnWrapper = css({
  marginTop: 'auto',
});

const input = css({
  padding: '4px',
  borderRadius: '4px',
});

export function CalendarDay({ dayItem, addTask }: CalendarDayProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState('');

  const { id, day, month, type, tasks } = dayItem;

  const openInput = () => {
    setIsEditMode(true);
  };

  const addNewTask = () => {
    addTask(id, value);
    setIsEditMode(false);
    setValue('');
  };

  const rejectAddNewTask = () => {
    setIsEditMode(false);
    setValue('');
  };

  const { ref } = useOnClickOutside(() => setIsEditMode(false));

  return (
    <div ref={ref} className={dayWrapper(type)}>
      {type === 'current' ? (
        <p>{day}</p>
      ) : (
        <p>
          {day}, {month}
        </p>
      )}
      {type === 'current' && (
        <>
          <div className={taskWrapper}>
            {isEditMode && (
              <>
                <input
                  name="task"
                  className={input}
                  onChange={e => setValue(e.target.value)}
                />
                <div className={buttonSet}>
                  <Button
                    disabled={isEditMode && value.trim().length === 0}
                    onClick={addNewTask}
                  >
                    Ok
                  </Button>
                  <Button onClick={rejectAddNewTask}>Cancel</Button>
                </div>
              </>
            )}
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map(item => (
                <Task key={item.id} item={item} />
              ))}
            </SortableContext>
          </div>
          <div className={btnWrapper}>
            <Button disabled={isEditMode} onClick={openInput} type="button">
              Add new task
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
