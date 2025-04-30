import { useCallback } from 'react';
import { useFormBuilderStore } from '@/store/formBuilderStore';
import { NormalizedFieldData, ColumnName } from '@/types/form-builder';

export const useFormBuilder = () => {
  const {
    fields,
    title,
    description,
    activeFieldId,
    isDragging,
    dragOverColumn,
    setTitle,
    setDescription,
    setActiveFieldId,
    setIsDragging,
    setDragOverColumn,
    addField,
    updateField,
    removeField,
    moveField,
    reorderField,
    resetForm,
    importForm,
  } = useFormBuilderStore();

  const getFieldById = useCallback(
    (id: string): NormalizedFieldData | undefined => {
      return fields.byId[id];
    },
    [fields.byId]
  );

  const getFieldsByColumn = useCallback(
    (column: ColumnName) => {
      const columnIds = column === 'left' ? fields.leftColumn : fields.rightColumn;
      return columnIds.map((id) => fields.byId[id]);
    },
    [fields]
  );

  return {
    // State
    fields,
    title,
    description,
    activeFieldId,
    isDragging,
    dragOverColumn,

    // Actions
    setTitle,
    setDescription,
    setActiveFieldId,
    setIsDragging,
    setDragOverColumn,
    addField,
    updateField,
    removeField,
    moveField,
    reorderField,
    resetForm,
    importForm,

    // Helpers
    getFieldById,
    getFieldsByColumn,
  };
}; 