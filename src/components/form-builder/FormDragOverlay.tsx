import React, { memo, useMemo, useState, useEffect } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { DragItem } from '@/types/form-builder';
import { fieldRegistry } from './registry';
import { useFormBuilderSelector } from '@/hooks/useFormBuilderSelector';

interface FormDragOverlayProps {
  activeItem: DragItem | null;
}

const FormDragOverlayComponent: React.FC<FormDragOverlayProps> = ({
  activeItem,
}) => {
  const { useIsDragging } = useFormBuilderSelector();
  const isDragging = useIsDragging();
  
  // Track if the item was just dropped
  const [isDropping, setIsDropping] = useState(false);
  
  // Reset isDropping when dragging state changes
  useEffect(() => {
    if (isDragging) {
      setIsDropping(false);
    } else if (activeItem) {
      // When dragging stops but we still have an activeItem, we're in the dropping phase
      setIsDropping(true);
      
      // Hide the overlay after a very short delay to allow the animation to complete
      const timer = setTimeout(() => {
        setIsDropping(false);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isDragging, activeItem]);
  
  // Use useMemo to avoid recreating content on every render
  const overlayContent = useMemo(() => {
    // Don't show anything if we're not dragging and not in dropping phase
    if ((!isDragging && !isDropping) || !activeItem) return null;
    
    return (
      <div className="p-4 bg-background border rounded-md shadow-md opacity-80 flex items-center gap-2">
        {fieldRegistry[activeItem.type]?.icon}
        <span>
          {activeItem.isNew ? 'New ' : 'Move '} 
          {activeItem.type} field
        </span>
      </div>
    );
  }, [isDragging, isDropping, activeItem]);
  
  // Simpler approach - disable the default drop animation
  // This will prevent the visual flicker where the item returns to its origin
  return (
    <DragOverlay dropAnimation={null}>
      {overlayContent}
    </DragOverlay>
  );
};

// Export memoized component to avoid unnecessary re-renders
export const FormDragOverlay = memo(FormDragOverlayComponent); 