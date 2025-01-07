import { useEffect, useState } from 'react';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { css } from '@emotion/css';

import { Button } from '../shared';
import { Task } from '../task';
import { DayAndHolidays } from './DayAndHolidays';
import { DayWrapper } from './DayWrapper';
import { EditForm } from './EditForm';

interface CalendarDayProps {
  dayItem: CalendarDay;
  index: number;
  addTask: (dayId: string, value: string) => void;
  editTask: (dayId: string, taskId: string, value: string) => void;
  deleteTask: (dayId: string, taskId: string) => void;
  holidays: Holidays[];
  filter: string;
}

export function CalendarDay({
  dayItem,
  index,
  addTask,
  editTask,
  deleteTask,
  holidays,
  filter,
}: CalendarDayProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const { id, type, tasks } = dayItem;

  const { setNodeRef } = useDroppable({
    id,
  });

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
      setValue('');
    }
    setCurrentTaskId('');
  };

  const rejectAddNewTask = () => {
    setIsEditMode(false);
    setEdit(false);
    setValue('');
    setCurrentTaskId('');
  };

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

  useEffect(() => {
    setFilteredTasks(tasks.filter(item => item.text.includes(filter)));
  }, [filter, tasks]);

  return (
    <DayWrapper
      id={id}
      type={type}
      index={index}
      rejectAddNewTask={rejectAddNewTask}
    >
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
              id={id}
              items={filteredTasks}
              strategy={verticalListSortingStrategy}
            >
              <div className={tasksList} ref={setNodeRef}>
                {filteredTasks.map(item => (
                  <Task
                    key={item.id}
                    item={item}
                    editItem={editItem}
                    deleteItem={deleteItem}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
          <Button disabled={isEditMode} onClick={openInput} type="button">
            Add new task
          </Button>
        </>
      )}
    </DayWrapper>
  );
}

const taskWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  overflowY: 'scroll',
  overscrollBehavior: 'contain',
  height: '100%',
});

const tasksList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
});
