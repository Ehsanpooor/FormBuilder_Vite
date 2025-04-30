import React, { memo, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useFormBuilderSelector } from '@/hooks/useFormBuilderSelector';

interface FormToolbarProps {
  resetDialogOpen: boolean;
  setResetDialogOpen: (open: boolean) => void;
}

const FormToolbarComponent: React.FC<FormToolbarProps> = ({
  resetDialogOpen,
  setResetDialogOpen,
}) => {
  const { useResetForm, useFormFields, useTitle, useDescription, useIsFormValid } = useFormBuilderSelector();
  const resetForm = useResetForm();
  const fields = useFormFields();
  const title = useTitle();
  const description = useDescription();
  const isFormValid = useIsFormValid();
  
  // Memoize handlers to prevent recreating functions on every render
  const handleReset = useCallback(() => {
    resetForm();
    setResetDialogOpen(false);
  }, [resetForm, setResetDialogOpen]);

  const handleSave = useCallback(async () => {
    if (!isFormValid) {
      toast.error('Form not valid. You must add at least one field and a submit button before saving.');
      return;
    }
    
    const userId = 'user'; // Replace with real user id if available
    const formData = { title, description, fields };
    localStorage.setItem(`formBuilder:form:${userId}`, JSON.stringify(formData));
    toast.success(`Form saved! Your form is public at /forms/${userId}`);
  }, [isFormValid, title, description, fields]);
  
  const handleCloseDialog = useCallback(() => {
    setResetDialogOpen(false);
  }, [setResetDialogOpen]);
  
  // Memoize dialog content to prevent recreating on every render
  const dialogContent = useMemo(() => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reset Form</DialogTitle>
        <DialogDescription>
          Are you sure you want to reset the form? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
        <Button variant="destructive" onClick={handleReset}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  ), [handleCloseDialog, handleReset]);
  
  return (
    <div className="flex items-center justify-end gap-4 p-4 bg-white">
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Reset</Button>
        </DialogTrigger>
        {dialogContent}
        <Button variant="default" onClick={handleSave}>Save</Button>
      </Dialog>
    </div>
  );
};

// Export memoized component to avoid unnecessary re-renders
export const FormToolbar = memo(FormToolbarComponent); 