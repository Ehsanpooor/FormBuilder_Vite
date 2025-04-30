import React, { useEffect, useState, useRef } from 'react';
import { DndContext } from '@dnd-kit/core';
import { FormBuilderProps, DragItem } from '@/types/form-builder';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { Canvas } from '@/components/form-builder/Canvas';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { FormToolbar } from '@/components/form-builder/FormToolbar';
import { FormDragOverlay } from '@/components/form-builder/FormDragOverlay';
import { FormToolboxSidebar } from '@/components/form-builder/FormToolboxSidebar';
import { FormPropertiesSidebar } from '@/components/form-builder/FormPropertiesSidebar';
import { useFormBuilderSelector } from '@/hooks/useFormBuilderSelector';
import { SeoHead } from '@/lib/SeoHead';

export const FormBuilder: React.FC<FormBuilderProps> = ({ 
  initialState,
  className,
}) => {
  const { 
    sensors, 
    handleDragStart: _handleDragStart, 
    handleDragOver: _handleDragOver, 
    handleDragEnd: _handleDragEnd, 
    handleDragCancel 
  } = useDragAndDrop();
  
  // Use the custom selector hook
  const { useImportForm, useFormFields } = useFormBuilderSelector();
  const importForm = useImportForm();
  const fields = useFormFields();
  
  // Local state
  const [activeItem, setActiveItem] = useState<DragItem | null>(null);
  const currentDragDataRef = useRef<DragItem | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const fieldCount = Object.keys(fields.byId).length;
  const prevFieldCount = useRef(fieldCount);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Monitor canvas height changes
  useEffect(() => {
    if (!canvasRef.current) return;

    const updateHeight = () => {
      if (canvasRef.current) {
        setCanvasHeight(canvasRef.current.offsetHeight);
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(canvasRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Initialize with initial state if provided
  useEffect(() => {
    if (initialState) {
      importForm(initialState);
    }
  }, [initialState, importForm]);

  useEffect(() => {
    if (fieldCount > prevFieldCount.current) {
      setPropertiesOpen(true);
    }
    prevFieldCount.current = fieldCount;
  }, [fieldCount]);

  // Properties panel animation effects
  useEffect(() => {
    if (propertiesOpen) {
      const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'max-width') {
          setContentVisible(true);
          sidebarRef.current?.removeEventListener('transitionend', handleTransitionEnd as any);
        }
      };
      if (sidebarRef.current) {
        sidebarRef.current.addEventListener('transitionend', handleTransitionEnd as any);
      } else {
        setContentVisible(true);
      }
    } else {
      setContentVisible(false);
    }
  }, [propertiesOpen]);

  useEffect(() => {
    if (!contentVisible && !propertiesOpen) return;
    if (!contentVisible && propertiesOpen) {
      const timeout = setTimeout(() => {
        setPropertiesOpen(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [contentVisible, propertiesOpen]);

  const handleDragStart = (event: any) => {
    const { active } = event;
    
    if (active?.data?.current) {
      const dragData = {...active.data.current};
      setActiveItem(dragData);
      currentDragDataRef.current = dragData;
      _handleDragStart(event);
    }
  };

  const handleDragOver = (event: any) => {
    if (currentDragDataRef.current && event.active) {
      if (event.active.data && typeof event.active.data.update === 'function') {
        event.active.data.update(currentDragDataRef.current);
      }
    }
    
    const augmentedEvent = {
      ...event,
      active: event.active ? {
        ...event.active,
        data: {
          ...event.active.data,
          current: currentDragDataRef.current
        }
      } : event.active
    };
    
    _handleDragOver(augmentedEvent);
  };

  const handleDragEnd = (event: any) => {
    if (currentDragDataRef.current && event.active) {
      if (event.active.data && typeof event.active.data.update === 'function') {
        event.active.data.update(currentDragDataRef.current);
      }
    }
    
    const augmentedEvent = {
      ...event,
      active: event.active ? {
        ...event.active,
        data: {
          ...event.active.data,
          current: currentDragDataRef.current
        }
      } : event.active
    };
    
    _handleDragEnd(augmentedEvent);
    setActiveItem(null);
    currentDragDataRef.current = null;
  };

  const onDragCancel = () => {
    setActiveItem(null);
    currentDragDataRef.current = null;
    handleDragCancel();
  };

  return (
    <>
      <SeoHead
        title="Dashboard"
        description="Manage your forms and view analytics"
        noIndex={true}
      />
      <div className={cn("flex h-full w-full border rounded-lg overflow-hidden relative", className)}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={onDragCancel}
        >
          <div className="flex h-full w-full">
            <FormToolboxSidebar canvasHeight={canvasHeight} />
            
            <div className={cn(
              "transition-all duration-300",
              propertiesOpen ? "flex-grow" : "flex-grow"
            )}>
              <FormToolbar
                resetDialogOpen={resetDialogOpen}
                setResetDialogOpen={setResetDialogOpen}
              />
              <Separator />
              <Canvas
                ref={canvasRef}
                onFieldSelect={() => setPropertiesOpen(true)}
              />
            </div>

            <FormPropertiesSidebar
              propertiesOpen={propertiesOpen}
              contentVisible={contentVisible}
              sidebarRef={sidebarRef}
              onCloseSidebar={() => setContentVisible(false)}
            />
          </div>

          <FormDragOverlay
            activeItem={activeItem}
          />
        </DndContext>
      </div>
    </>
  );
};

export default FormBuilder; 