import React, { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ColumnName } from '@/types/form-builder';
import { cn } from '@/lib/utils';

interface DroppableProps {
  id: ColumnName;
  columnName: ColumnName;
  children: React.ReactNode;
  className?: string;
}

const DroppableComponent: React.FC<DroppableProps> = ({ 
  id, 
  columnName, 
  children,
  className 
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: 'column',
      columnName: columnName,
      id: id
    }
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        'relative transition-all duration-300 ease-in-out',
        isOver && 'ring-2 ring-primary ring-offset-2 scale-[1.02]',
        className
      )}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};

export const Droppable = memo(DroppableComponent);

export default Droppable; 