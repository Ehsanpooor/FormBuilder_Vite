import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState, useRef } from 'react';
import { useFormBuilderStore } from '@/store/formBuilderStore';
import { FieldType, DragItem, ColumnName } from '@/types/form-builder';
import { fieldRegistry } from '@/components/form-builder/registry';

// Type guard for DragItem
const isDragItem = (data: unknown): data is DragItem => {
  if (!data || typeof data !== 'object') {
    console.error('Drag data is not an object:', data);
    return false;
  }
  
  const item = data as Partial<DragItem>;
  
  // Check all required properties exist and are the correct type
  const hasValidId = typeof item.id === 'string';
  const hasValidType = typeof item.type === 'string';
  const hasValidIsNew = typeof item.isNew === 'boolean';
  const hasValidFromColumn = !item.fromColumn || typeof item.fromColumn === 'string';
  
  // Log specific missing properties for debugging
  if (!hasValidId) console.error('Missing or invalid id in drag data');
  if (!hasValidType) console.error('Missing or invalid type in drag data');
  if (!hasValidIsNew) console.error('Missing or invalid isNew in drag data');
  if (!hasValidFromColumn) console.error('Invalid fromColumn in drag data');
  
  return hasValidId && hasValidType && hasValidIsNew && hasValidFromColumn;
};

export const useDragAndDrop = () => {
  const setIsDragging = useFormBuilderStore((state) => state.setIsDragging);
  const setDragOverColumn = useFormBuilderStore((state) => state.setDragOverColumn);
  const addField: (field: any, column: ColumnName) => string = useFormBuilderStore((state) => state.addField);
  const moveField = useFormBuilderStore((state) => state.moveField);
  const reorderField = useFormBuilderStore((state) => state.reorderField);
  const fields = useFormBuilderStore((state) => state.fields);
  const dragOverColumn = useFormBuilderStore((state) => state.dragOverColumn);
  const setActiveFieldId = useFormBuilderStore((state) => state.setActiveFieldId);
  
  // Keep a local copy of the current drag item for safety
  const [activeDragItem, setActiveDragItem] = useState<DragItem | null>(null);
  const dragItemRef = useRef<DragItem | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    try {
      const { active } = event;
      
      if (!active?.data?.current) {
        console.error('No drag data available');
        return;
      }

      const dragData = active.data.current;

      // Store this drag data for later use, making sure we create a deep copy
      if (isDragItem(dragData)) {
        const safeDragData = { ...dragData };
        dragItemRef.current = safeDragData;
        setActiveDragItem(safeDragData);
        
      
        
        setIsDragging(true);
        if (!safeDragData.isNew && safeDragData.fromColumn) {
          setDragOverColumn(safeDragData.fromColumn);
        }
      } else {
        console.error('Invalid drag data:', dragData);
      }
    } catch (error) {
      console.error('Error in handleDragStart:', error);
      setIsDragging(false);
      setDragOverColumn(null);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    try {
      const { active, over } = event;
      
      // Use our locally stored drag data if the event's data is missing
      const dragData = (active?.data?.current && Object.keys(active.data.current).length > 0) 
        ? active.data.current 
        : (dragItemRef.current || activeDragItem);
      
      if (!dragData) {
        console.error('No drag data available in handleDragOver');
        return;
      }

      if (!isDragItem(dragData)) {
        console.error('Invalid drag data:', dragData);
        return;
      }

     

      if (over?.data.current?.type === 'column') {
        setDragOverColumn(over.id as ColumnName);
      } else {
        setDragOverColumn(null);
      }
    } catch (error) {
      console.error('Error in handleDragOver:', error);
      setDragOverColumn(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    try {
      const { active, over } = event;
      
      // Use our locally stored drag data if the event's data is missing
      const dragData = (active?.data?.current && Object.keys(active.data.current).length > 0) 
        ? active.data.current 
        : (dragItemRef.current || activeDragItem);
      
      if (!dragData) {
        console.error('No drag data available in handleDragEnd');
        setIsDragging(false);
        setDragOverColumn(null);
        return;
      }


      if (!isDragItem(dragData)) {
        console.error('Invalid drag data:', dragData);
        setIsDragging(false);
        setDragOverColumn(null);
        return;
      }

      if (!over || typeof over.id !== 'string') {
        setIsDragging(false);
        setDragOverColumn(null);
        return;
      }

      // Find the target column by checking which column array contains the over.id
      let targetColumn: ColumnName | null = null;
      if (fields.leftColumn.includes(over.id as string)) targetColumn = 'left';
      if (fields.rightColumn.includes(over.id as string)) targetColumn = 'right';
      // If dropped on empty column, fallback to dragOverColumn
      if (!targetColumn && typeof dragOverColumn === 'string') targetColumn = dragOverColumn;
      if (!targetColumn) {
        setIsDragging(false);
        setDragOverColumn(null);
        return;
      }

      // Keep the isDragging state active a bit longer to allow for a smooth transition
      // This prevents the visual flicker of returning to the original position
      
      if (dragData.isNew) {
        const fieldType = dragData.type as FieldType;
        const fieldConfig = fieldRegistry[fieldType];
        
        if (!fieldConfig) {
          console.error('Unknown field type:', fieldType);
          setIsDragging(false);
          setDragOverColumn(null);
          return;
        }

        const defaultConfig = fieldConfig.defaultConfig || {};
        
        const newField = {
          type: fieldType,
          label: `New ${fieldType} field`,
          required: false,
          config: defaultConfig
        };

        // Important: Delay the isDragging state change to allow for a smooth transition
        // Add the field immediately to ensure functionality works
        const newId = addField(newField, targetColumn);
        
        // Small delay before clearing the dragging state
        // This allows the overlay to "disappear" where it was dropped
        setTimeout(() => {
          setActiveFieldId(newId);
          setIsDragging(false);
          setDragOverColumn(null);
          setActiveDragItem(null);
          dragItemRef.current = null;
        }, 50);
        
      } else if (dragData.fromColumn) {
        const colArr = targetColumn === 'left' ? fields.leftColumn : fields.rightColumn;
        const fromIndex = dragData.fromIndex ?? colArr.indexOf(dragData.id);
        let toIndex = colArr.indexOf(over.id as string);
        if (toIndex === -1) toIndex = colArr.length - 1;
        
        if (dragData.fromColumn !== targetColumn) {
          // Move field between columns
          moveField(dragData.id, dragData.fromColumn, targetColumn);
          
          // After moving, reorder in the new column
          setTimeout(() => {
            reorderField(dragData.id, colArr.length, toIndex, targetColumn!);
            
            // Clear dragging state after a small delay
            setTimeout(() => {
              setIsDragging(false);
              setDragOverColumn(null);
              setActiveDragItem(null);
              dragItemRef.current = null;
            }, 50);
          }, 0);
        } else {
          // Reorder within the same column
          if (fromIndex !== toIndex && toIndex !== -1) {
            reorderField(dragData.id, fromIndex, toIndex, targetColumn);
            
            // Clear dragging state after a small delay
            setTimeout(() => {
              setIsDragging(false);
              setDragOverColumn(null);
              setActiveDragItem(null);
              dragItemRef.current = null;
            }, 50);
          } else {
            // No change in position, clear state immediately
            setIsDragging(false);
            setDragOverColumn(null);
            setActiveDragItem(null);
            dragItemRef.current = null;
          }
        }
      }
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
      setIsDragging(false);
      setDragOverColumn(null);
      setActiveDragItem(null);
      dragItemRef.current = null;
    }
  };

  const handleDragCancel = () => {
    setIsDragging(false);
    setDragOverColumn(null);
    setActiveDragItem(null);
    dragItemRef.current = null;
  };

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
};

// Helper to create data for a new draggable element
export const createDragData = (type: FieldType): DragItem => {
  const dragData: DragItem = {
    id: `new-${type}-${Date.now()}`,
    type,
    isNew: true
  };
  return dragData;
};

// Helper to create data for an existing element
export const createExistingElementDragData = (id: string, type: FieldType, fromColumn: ColumnName): DragItem => {
  const dragData: DragItem = {
    id,
    type,
    fromColumn,
    isNew: false
  };
  return dragData;
}; 