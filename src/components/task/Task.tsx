import { useRef } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';

import { IconButton } from '../shared/IconButton';

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

  const taskWrapper = css({
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: '4px',
    borderRadius: '4px',
    transform: CSS.Transform.toString(transform),
    transition,
  });

  const dnd = css({
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

  const handleEditItem = () => {
    editItem(item.id);
  };

  const handleDeleteItem = () => {
    deleteItem(item.id);
  };

  return (
    <div className={taskWrapper}>
      <div className={dndWrapper}>
        <div ref={setNodeRef} {...attributes} {...listeners} className={dnd}>
          <MdOutlineDragIndicator size={24} />
        </div>
        <div ref={btnWrapperRef} className={btnWrapper}>
          <IconButton onClick={handleEditItem}>
            <CiEdit size={24} color="#000" />
          </IconButton>
          <IconButton onClick={handleDeleteItem}>
            <TiDelete size={24} color="#000" />
          </IconButton>
        </div>
      </div>
      <p className={text}>{item.text}</p>
    </div>
  );
}
