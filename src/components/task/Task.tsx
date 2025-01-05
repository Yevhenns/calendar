import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';

interface TaskProps {
  item: Task;
}

export function Task({ item }: TaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const taskWrapper = css({
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '4px',
    cursor: isDragging ? 'grabbing' : 'grab',
    transform: CSS.Transform.toString(transform),
    transition,
  });

  const text = css({
    wordWrap: 'break-word',
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={taskWrapper}
    >
      <p className={text}>{item.text}</p>
    </div>
  );
}
