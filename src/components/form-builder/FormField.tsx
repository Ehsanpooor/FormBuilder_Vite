import React, { memo } from 'react';
import { NormalizedFieldData, ColumnName } from '@/types/form-builder';
import { useFormBuilder } from '@/hooks/useFormBuilder';
import { Draggable } from '@/components/form-builder/Draggable';
import { createExistingElementDragData } from '@/hooks/useDragAndDrop';
import { cn } from '@/lib/utils';
import { renderField } from '@/components/form-builder/registry';

interface FormFieldProps {
  element: NormalizedFieldData;
  columnName: ColumnName;
  index?: number;
  onFieldSelect?: () => void;
}

export const FormField: React.FC<FormFieldProps> = memo(({ element, columnName, index, onFieldSelect }) => {
  const { activeFieldId, setActiveFieldId } = useFormBuilder();
  const isActive = activeFieldId === element.id;
  
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveFieldId(element.id);
    if (onFieldSelect) onFieldSelect();
  };
  
  const dragData = { ...createExistingElementDragData(element.id, element.type, columnName), fromIndex: index };
  
  return (
    <Draggable id={element.id} data={dragData}>
      <div 
        className={cn(
          'relative cursor-move',
          isActive && 'ring-primary'
        )}
        onClick={handleSelect}
      >
        
          {renderField(element)}
        
      </div>
    </Draggable>
  );
});

FormField.displayName = 'FormField';

export default FormField; 