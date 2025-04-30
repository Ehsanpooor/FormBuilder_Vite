import React, { forwardRef, memo } from 'react';
import type { CanvasProps, ColumnName, NormalizedFieldData } from '@/types/form-builder';
import { Droppable } from '@/components/form-builder/Droppable';
import { FormField } from '@/components/form-builder/FormField';
import { cn } from '@/lib/utils';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCanvasOptimizer } from '@/hooks/useCanvasOptimizer';
import { Separator } from '@radix-ui/react-separator';

interface CanvasWithFieldSelectProps extends CanvasProps {
  onFieldSelect?: () => void;
}

interface ColumnProps {
  name: ColumnName;
  title: string;
  className?: string;
  onFieldSelect?: () => void;
}

// Component to display the form elements - now using memo for performance
const ElementsColumn: React.FC<ColumnProps> = memo(({ name, onFieldSelect }) => {
  // Use optimized hook for better performance and smoother transitions
  const columnData = useCanvasOptimizer();
  const elements = columnData[name].fields;
  const ids = columnData[name].ids;
  
  return (
    <SortableContext id={name} items={ids} strategy={verticalListSortingStrategy}>
      <div className="space-y-5 min-h-[200px]  flex flex-col items-center max-md:w-full">
        {elements.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No elements yet</p>
          </div>
        ) : (
          <div className="space-y-5 max-w-[350px] flex flex-col w-full max-md:w-full">
            {elements.map((element: NormalizedFieldData, idx: number) => (
              <FormField 
                key={element.id} 
                element={element}
                columnName={name}
                index={idx}
                onFieldSelect={onFieldSelect}
              />
            ))}
          </div>
        )}
      </div>
    </SortableContext>
  );
});

// Component for the drop areas - now using memo for performance
const DropArea: React.FC<ColumnProps> = memo(({ name, title, className }) => {
  // Use optimized hook instead of direct store access
  const columnData = useCanvasOptimizer();
  const isDragging = columnData.isDragging;
  const isCurrentDropTarget = columnData[name].isDropTarget;
  
  return (
    <Droppable id={name} columnName={name} className={className}>
      <div className={cn(
        "h-[100px] rounded-lg transition-all duration-200",
        "border-2 border-dashed",
        isDragging ? "border-primary/50" : "border-muted-foreground/25",
        isCurrentDropTarget && "border-primary border-solid bg-primary/5"
      )}>
        <div className="h-full flex items-center justify-center">
          <p className={cn(
            "text-sm transition-colors duration-200",
            isDragging ? "text-primary" : "text-muted-foreground"
          )}>
            {isDragging ? `Drop here to add to ${title}` : `Drop elements here for ${title}`}
          </p>
        </div>
      </div>
    </Droppable>
  );
});

// Display names for better debugging
ElementsColumn.displayName = 'ElementsColumn';
DropArea.displayName = 'DropArea';

// Main canvas component
export const Canvas = forwardRef<HTMLDivElement, CanvasWithFieldSelectProps>(({ className, onFieldSelect }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn("flex-1 p-6", className)}
    >
      {/* Elements display area */}
      <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
        <ElementsColumn name="left" title="Left Column" onFieldSelect={onFieldSelect} />
        <ElementsColumn name="right" title="Right Column" onFieldSelect={onFieldSelect} />
      </div>
      <Separator className='my-8 bg-muted-foreground/25 h-[1px]' />
      {/* Drop areas */}
      <div className="grid grid-cols-2 gap-4">
        <DropArea name="left" title="Left Column" />
        <DropArea name="right" title="Right Column" />
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas; 