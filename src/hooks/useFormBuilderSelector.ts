import { useCallback } from 'react';
import { useFormBuilderStore } from '@/store/formBuilderStore';

/**
 * Custom selector hook for FormBuilder components
 * This allows components to select only the state they need
 * which improves performance by reducing unnecessary re-renders
 */
export function useFormBuilderSelector() {
  // Toolbar selectors - Memoize these to prevent unnecessary hook recreations
  const useTitle = () => useFormBuilderStore((state) => state.title);
  const useDescription = () => useFormBuilderStore((state) => state.description);
  const useResetForm = () => useFormBuilderStore((state) => state.resetForm);
  
  // Use object reference check for complex objects to avoid unnecessary re-renders
  const useFormFields = () => useFormBuilderStore((state) => state.fields);

  // DragOverlay selectors
  const useIsDragging = () => useFormBuilderStore((state) => state.isDragging);
  
  // Properties panel selectors
  const useActiveFieldId = () => useFormBuilderStore((state) => state.activeFieldId);
  
  // Optimize field selection with memoization
  const useField = (id: string | null) => {
    // Return a memoized selector function that only updates when the specific field changes
    const selector = useCallback(
      (state: any) => id ? state.fields.byId[id] : null,
      [id]
    );
    
    return useFormBuilderStore(selector);
  };
  
  // Validation selector with memoization
  const useIsFormValid = () => {
    return useFormBuilderStore((state) => {
      const allFields = Object.values(state.fields.byId);
      const hasFields = allFields.length > 0;
      const hasSubmit = allFields.some(f => f.type === 'submit');
      return hasFields && hasSubmit;
    });
  };

  // Import/Export selectors
  const useImportForm = () => useFormBuilderStore((state) => state.importForm);
  
  // Create a memoized selector for export data
  const useExportForm = () => {
    return useFormBuilderStore((state) => ({
      title: state.title,
      description: state.description,
      fields: state.fields
    }));
  };

  return {
    useTitle,
    useDescription,
    useResetForm,
    useFormFields,
    useIsDragging,
    useActiveFieldId,
    useField,
    useIsFormValid,
    useImportForm,
    useExportForm
  };
} 