import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragItem } from '@/types/form-builder';

interface DraggableProps {
  id: string;
  data: DragItem;
  children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ id, data, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {children}
    </div>
  );
};

export default Draggable; 