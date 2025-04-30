import { useMemo } from 'react';
import { useFormBuilder } from './useFormBuilder';

/**
 * Custom hook for validating form state with optimized memoization
 * to reduce unnecessary re-computation
 */
export function useFormValidator() {
  const { fields } = useFormBuilder();
  
  // Calculate and memoize form validation state
  const validationState = useMemo(() => {
    const allFields = Object.values(fields.byId);
    const fieldCount = allFields.length;
    const requiredFields = allFields.filter(field => field.required);
    const hasSubmitButton = allFields.some(field => field.type === 'submit');
    
    // Missing requirements
    const missingRequirements = [];
    
    if (fieldCount === 0) {
      missingRequirements.push('At least one form field is required');
    }
    
    if (!hasSubmitButton) {
      missingRequirements.push('A submit button is required');
    }
    
    // Validation score from 0-100
    const validationScore = Math.min(100, Math.max(0, 
      (fieldCount > 0 ? 50 : 0) + 
      (hasSubmitButton ? 50 : 0)
    ));
    
    return {
      isValid: missingRequirements.length === 0,
      isComplete: validationScore === 100,
      validationScore,
      missingRequirements,
      fieldCount,
      hasSubmitButton,
      requiredFieldCount: requiredFields.length
    };
  }, [fields.byId]);
  
  return validationState;
} 