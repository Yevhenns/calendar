import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';

interface TaskProps {
  item: Task;
}

export function Task({ item }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const taskWrapper = css({
    backgroundColor: '#FFFFFF',
    transform: CSS.Transform.toString(transform),
    transition,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={taskWrapper}
    >
      <p>{item.text}</p>
    </div>
  );
}
