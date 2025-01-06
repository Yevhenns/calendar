import { useEffect, useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { css } from '@emotion/css';
import { nanoid } from 'nanoid';

import { CalendarDay } from './CalendarDay';

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems(month => {
      return month.map(week => {
        return week.map(day => {
          const oldIndex = day.tasks.findIndex(task => task.id === active.id);
          const newIndex = day.tasks.findIndex(task => task.id === over?.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            const updatedTasks = arrayMove(day.tasks, oldIndex, newIndex);
            return { ...day, tasks: updatedTasks };
          }
          return day;
        });
      });
    });
  }

  useEffect(() => {
    if (finalDaysArray) {
      setItems(finalDaysArray);
    }
  }, [finalDaysArray]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={monthWrapper}>
        {items.map((item, index) => {
          return (
            <div key={index} className={weekWrapper}>
              {item.map((dayItem, index) => {
                return (
                  <CalendarDay
                    key={index}
                    dayItem={dayItem}
                    index={index}
                    addTask={addTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
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
