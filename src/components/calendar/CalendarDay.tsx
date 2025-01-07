import { useState } from 'react';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { css } from '@emotion/css';
import dayjs from 'dayjs';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Button } from '../shared/Button';
import { Task } from '../task';
import { DayAndHolidays } from './DayAndHolidays';
import { EditForm } from './EditForm';

interface CalendarDayProps {
  dayItem: CalendarDay;
  index: number;
  addTask: (dayId: string, value: string) => void;
  editTask: (dayId: string, taskId: string, value: string) => void;
  deleteTask: (dayId: string, taskId: string) => void;
  holidays: Holidays[];
}

export function CalendarDay({
  dayItem,
  index,
  addTask,
  editTask,
  deleteTask,
  holidays,
}: CalendarDayProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState('');

  const { id, type, tasks } = dayItem;

  const isDayToday = dayjs().format('YYYY-MM-DD') === id;
  const isWeekend = index === 0 || index === 6;

  const filteredHolidays = holidays.filter(item => item.date === id);

  const openInput = () => {
    setIsEditMode(true);
    setEdit(false);
    setCurrentTaskId('');
  };

  const submitTask = () => {
    if (!edit) {
      addTask(id, value);
      setIsEditMode(false);
      setEdit(false);
      setValue('');
    } else {
      editTask(id, currentTaskId, value);
      setIsEditMode(false);
    }
    setCurrentTaskId('');
  };

  const rejectAddNewTask = () => {
    setIsEditMode(false);
    setEdit(false);
    setValue('');
    setCurrentTaskId('');
  };

  const { ref } = useOnClickOutside(rejectAddNewTask);

  const deleteItem = (taskId: string) => {
    deleteTask(id, taskId);
  };

  const editItem = (taskId: string) => {
    setIsEditMode(true);
    setEdit(true);
    const taskById = tasks.find(item => item.id === taskId);
    setValue(taskById!.text);
    setCurrentTaskId(taskId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div ref={ref} className={dayWrapper({ type, isDayToday, isWeekend })}>
      <DayAndHolidays dayItem={dayItem} filteredHolidays={filteredHolidays} />
      {type === 'current' && (
        <>
          <div className={taskWrapper}>
            <EditForm
              isEditMode={isEditMode}
              value={value}
              submitTask={submitTask}
              rejectAddNewTask={rejectAddNewTask}
              handleInputChange={handleInputChange}
            />
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map(item => (
                <Task
                  key={item.id}
                  item={item}
                  editItem={editItem}
                  deleteItem={deleteItem}
                />
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

const dayWrapper = ({
  type,
  isDayToday,
  isWeekend,
}: {
  type: CalendarDay['type'];
  isDayToday: boolean;
  isWeekend: boolean;
}) =>
  css({
    padding: '4px',
    textAlign: 'left',
    width: '200px',
    height: '300px',
    ...(type === 'current'
      ? {
          backgroundColor: '#FFEBCD',
        }
      : {
          backgroundColor: '#F0F8FF',
        }),
    ...(isDayToday && {
      backgroundColor: '#DCDCDC',
      border: '1px solid #000',
    }),
    ...(isWeekend &&
      !isDayToday && {
        backgroundColor: '#90EE90',
      }),
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
  overscrollBehavior: 'contain',
});

const btnWrapper = css({
  marginTop: 'auto',
});
