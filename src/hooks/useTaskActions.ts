import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

interface useTaskActionsProps {
  finalDaysArray: CalendarMonth | undefined;
}

export function useTaskActions({ finalDaysArray }: useTaskActionsProps) {
  const [items, setItems] = useState<CalendarMonth>([]);

  const addTask = (dayId: string, value: string) => {
    const task = {
      id: nanoid(),
      text: value,
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

  const editTask = (dayId: string, taskId: string, value: string) => {
    const task = {
      id: taskId,
      text: value,
    };
    setItems(prevItems => {
      const updatedDays = prevItems.map(week => {
        return week.map(day => {
          if (day.id === dayId) {
            const filteredArray = day.tasks.filter(item => item.id !== taskId);
            return { ...day, tasks: [...filteredArray, task] };
          }
          return day;
        });
      });
      return updatedDays;
    });
  };

  const deleteTask = (dayId: string, taskId: string) => {
    setItems(prevItems => {
      const updatedDays = prevItems.map(week => {
        return week.map(day => {
          if (day.id === dayId) {
            const filteredArray = day.tasks.filter(item => item.id !== taskId);
            return { ...day, tasks: filteredArray };
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

  return { items, setItems, addTask, editTask, deleteTask };
}
