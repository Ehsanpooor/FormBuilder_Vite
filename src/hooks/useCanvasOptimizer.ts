import { useMemo } from 'react';
import { useFormBuilder } from './useFormBuilder';
import { ColumnName } from '@/types/form-builder';

/**
 * Custom hook to optimize Canvas performance by memoizing data
 * and reducing unnecessary re-renders
 */
export function useCanvasOptimizer() {
  const { 
    fields, 
    isDragging, 
    dragOverColumn, 
    getFieldsByColumn 
  } = useFormBuilder();

  // Memoize field IDs by column to avoid unnecessary re-renders
  const fieldIdsByColumn = useMemo(() => {
    return {
      left: fields.leftColumn,
      right: fields.rightColumn
    };
  }, [fields.leftColumn, fields.rightColumn]);

  // Memoize fields by column
  const fieldsByColumn = useMemo(() => {
    return {
      left: getFieldsByColumn('left'),
      right: getFieldsByColumn('right')
    };
  }, [getFieldsByColumn, fields.byId, fields.leftColumn, fields.rightColumn]);

  // Helper to check if a column is the current drop target
  const isDropTarget = (column: ColumnName) => isDragging && dragOverColumn === column;

  // Return a memoized object with all data needed by Canvas components
  const columnData = useMemo(() => ({
    left: {
      isEmpty: fieldsByColumn.left.length === 0,
      isDropTarget: isDropTarget('left'),
      fields: fieldsByColumn.left,
      ids: fieldIdsByColumn.left
    },
    right: {
      isEmpty: fieldsByColumn.right.length === 0,
      isDropTarget: isDropTarget('right'),
      fields: fieldsByColumn.right,
      ids: fieldIdsByColumn.right
    },
    isDragging
  }), [
    fieldsByColumn.left, 
    fieldsByColumn.right, 
    fieldIdsByColumn.left, 
    fieldIdsByColumn.right, 
    isDragging, 
    dragOverColumn
  ]);

  return columnData;
} 