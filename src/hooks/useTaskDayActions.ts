import { useEffect, useState } from 'react';

interface useTaskDayActionsProps {
  id: string;
  tasks: Task[];
  filter: string;
  addTask: (dayId: string, value: string) => void;
  editTask: (dayId: string, taskId: string, value: string) => void;
  deleteTask: (dayId: string, taskId: string) => void;
}

export function useTaskDayActions({
  id,
  tasks,
  filter,
  addTask,
  editTask,
  deleteTask,
}: useTaskDayActionsProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState('');
  const [value, setValue] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    setFilteredTasks(tasks.filter(item => item.text.includes(filter)));
  }, [filter, tasks]);

  return {
    value,
    isEditMode,
    filteredTasks,
    setValue,
    openInput,
    submitTask,
    rejectAddNewTask,
    deleteItem,
    editItem,
  };
}
