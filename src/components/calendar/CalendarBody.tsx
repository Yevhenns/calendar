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

import { useTaskActions } from '../../hooks/useTaskActions';
import { CalendarDay } from './CalendarDay';

interface CalendarBodyBody {
  finalDaysArray?: CalendarMonth;
  holidays: Holidays[];
  filter: string;
}

export function CalendarBody({
  finalDaysArray,
  holidays,
  filter,
}: CalendarBodyBody) {
  const { items, setItems, addTask, editTask, deleteTask } = useTaskActions({
    finalDaysArray,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
                    holidays={holidays}
                    key={index}
                    dayItem={dayItem}
                    index={index}
                    addTask={addTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    filter={filter}
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

const monthWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const weekWrapper = css({
  display: 'flex',
  gap: '4px',
});
