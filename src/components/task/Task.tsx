import { useRef } from 'react';
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
  const btnWrapperRef = useRef<HTMLDivElement | null>(null);

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
    <div className={taskWrapper({ transform, transition })}>
      <div className={dndWrapper}>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className={dnd(isDragging)}
        >
          <MdOutlineDragIndicator size={24} />
        </div>
        <div ref={btnWrapperRef} className={btnWrapper}>
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
}: {
  transform: Transform | null;
  transition: string | undefined;
}) =>
  css({
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '4px',
    transform: CSS.Transform.toString(transform),
    transition,
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
  transition: 'right 0.3s linear',
});
