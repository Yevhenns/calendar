import { useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { TiDelete } from 'react-icons/ti';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';

import { IconButton } from '../shared/IconButton';

interface TaskProps {
  item: Task;
  deleteItem: (taskId: string) => void;
}

export function Task({ item, deleteItem }: TaskProps) {
  const [isHovered, setIsHovered] = useState(false);

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
    cursor: isDragging ? 'grabbing' : 'grab',
    transform: CSS.Transform.toString(transform),
    transition,
  });

  const text = css({
    wordWrap: 'break-word',
  });

  const btnWrapper = css({
    position: 'absolute',
    top: 0,
    right: isHovered ? '0' : '-60px',
    zIndex: isHovered ? 9 : 0,
    display: 'flex',
    gap: '4px',
    transition: 'right 0.3s linear',
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteItem = (e: any) => {
    e.stopPropagation();
    console.log(item);

    deleteItem(item.id);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={taskWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>a</div>
      <p className={text}>{item.text}</p>

      <div ref={btnWrapperRef} className={btnWrapper}>
        <IconButton>
          <CiEdit size={24} color="#000" />
        </IconButton>
        <IconButton onClick={handleDeleteItem}>
          <TiDelete size={24} color="#000" />
        </IconButton>
      </div>
    </div>
  );
}
