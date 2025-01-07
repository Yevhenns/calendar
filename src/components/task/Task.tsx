import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever, MdOutlineDragIndicator } from 'react-icons/md';

import { useSortable } from '@dnd-kit/sortable';
import { CSS, Transform } from '@dnd-kit/utilities';
import { css } from '@emotion/css';

import { IconButton } from '../shared';

interface TaskProps {
  item: Task;
  editItem: (taskId: string) => void;
  deleteItem: (taskId: string) => void;
}

export function Task({ item, editItem, deleteItem }: TaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const handleEditItem = () => {
    editItem(item.id);
  };

  const handleDeleteItem = () => {
    deleteItem(item.id);
  };

  return (
    <div
      ref={setNodeRef}
      className={taskWrapper({ transform, transition, isDragging })}
    >
      <div className={dndWrapper}>
        <div {...attributes} {...listeners} className={dnd(isDragging)}>
          <MdOutlineDragIndicator size={24} />
        </div>
        <div className={btnWrapper}>
          <IconButton onClick={handleEditItem}>
            <FaRegEdit size={18} color="#000" />
          </IconButton>
          <IconButton onClick={handleDeleteItem}>
            <MdOutlineDeleteForever size={24} color="#000" />
          </IconButton>
        </div>
      </div>
      <p className={text}>{item.text}</p>
    </div>
  );
}

const taskWrapper = ({
  transform,
  transition,
  isDragging,
}: {
  transform: Transform | null;
  transition: string | undefined;
  isDragging: boolean;
}) =>
  css({
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '4px',
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  });

const dnd = (isDragging: boolean) =>
  css({
    cursor: isDragging ? 'grabbing' : 'grab',
  });

const dndWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const text = css({
  wordWrap: 'break-word',
});

const btnWrapper = css({
  display: 'flex',
  gap: '4px',
});
