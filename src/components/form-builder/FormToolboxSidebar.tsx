import React, { memo, useEffect, useMemo, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FieldType } from '@/types/form-builder';
import { Draggable } from '@/components/form-builder/Draggable';
import { createDragData } from '@/hooks/useDragAndDrop';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useFormBuilderStore } from '@/store/formBuilderStore';
import {
  TextIcon,
  Type,
  KeyRound,
  Mail,
  Hash,
  CircleDot,
  CheckSquare,
  List,
  ToggleLeft,
  Calendar,
  Clock,
  Upload,
  Image,
  Edit3,
  Heading,
  AlignLeft,
  Minus,
  Send,
  RotateCcw,
  MoveRight,
  ChevronDown,
  PanelLeftClose,
  ArrowLeftToLine,
  ArrowRightToLine,
} from 'lucide-react';

interface FormToolboxSidebarProps {
  canvasHeight: number;
  className?: string;
}

interface FormElement {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

interface FormCategory {
  icon: React.ReactNode;
  items: FormElement[];
}

const formCategories: Record<string, FormCategory> = {
  'Basic Input Fields': {
    icon: <Type className="size-4" />,
    items: [
      { type: 'text', label: 'Single-line Text', icon: <TextIcon className="size-4" /> },
      { type: 'textarea', label: 'Multiline Text', icon: <AlignLeft className="size-4" /> },
      { type: 'password', label: 'Password', icon: <KeyRound className="size-4" /> },
      { type: 'email', label: 'Email', icon: <Mail className="size-4" /> },
      { type: 'number', label: 'Number', icon: <Hash className="size-4" /> },
    ],
  },
  'Choice Controls': {
    icon: <CircleDot className="size-4" />,
    items: [
      { type: 'radio', label: 'Radio Buttons', icon: <CircleDot className="size-4" /> },
      { type: 'checkbox', label: 'Checkboxes', icon: <CheckSquare className="size-4" /> },
      { type: 'select', label: 'Dropdown List', icon: <List className="size-4" /> },
      { type: 'toggle', label: 'Toggle Switch', icon: <ToggleLeft className="size-4" /> },
    ],
  },
  'Date and Time': {
    icon: <Calendar className="size-4" />,
    items: [
      { type: 'date', label: 'Date Picker', icon: <Calendar className="size-4" /> },
      { type: 'time', label: 'Time Picker', icon: <Clock className="size-4" /> },
    ],
  },
  'Rich Controls': {
    icon: <Upload className="size-4" />,
    items: [
      { type: 'file', label: 'File Upload', icon: <Upload className="size-4" /> },
      { type: 'image', label: 'Image Upload', icon: <Image className="size-4" /> },
      { type: 'signature', label: 'Signature', icon: <Edit3 className="size-4" /> },
    ],
  },
  'Text and Layout': {
    icon: <Heading className="size-4" />,
    items: [
      { type: 'header', label: 'Header', icon: <Heading className="size-4" /> },
      { type: 'paragraph', label: 'Paragraph', icon: <AlignLeft className="size-4" /> },
      { type: 'divider', label: 'Divider', icon: <Minus className="size-4" /> },
    ],
  },
  'Buttons': {
    icon: <Send className="size-4" />,
    items: [
      { type: 'submit', label: 'Submit Button', icon: <Send className="size-4" /> },
      { type: 'reset', label: 'Reset Button', icon: <RotateCcw className="size-4" /> },
      { type: 'custom', label: 'Custom Button', icon: <MoveRight className="size-4" /> },
    ],
  },
};
export function useIsMobile(breakpoint = 760) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false; // SSR safe
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

const ElementButton: React.FC<FormElement & { onAddToColumn?: (column: 'left' | 'right') => void }> = memo(({ type, label, icon, onAddToColumn }) => {
  const dragData = useMemo(() => createDragData(type), [type]);
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  if (isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
            {icon}
            <span>{label}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-52">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 "
              onClick={() => {onAddToColumn?.('left')
                setOpen(false)
              }}
            >
              <ArrowLeftToLine className="size-4" />
              Add to Left Column
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {onAddToColumn?.('right')
                setOpen(false)
              }}
            >
              <ArrowRightToLine className="size-4" />
              Add to Right Column
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Draggable id={dragData.id} data={dragData}>
      <div className="flex cursor-grab items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
        {icon}
        <span>{label}</span>
      </div>
    </Draggable>
  );
});

ElementButton.displayName = 'ElementButton';

const FormToolboxSidebarComponent: React.FC<FormToolboxSidebarProps> = ({
  canvasHeight,
  className
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { addField } = useFormBuilderStore();

  const handleAddToColumn = (type: FieldType, column: 'left' | 'right') => {
    // Create a basic field configuration based on the type
    const fieldConfig = {
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: `Enter ${type}...`,
      config: {
        // Add type-specific configuration options
        disabled: false,
        hidden: false,
      }
    };
    setIsOpen(false)
    // Add the field to the specified column using the store's addField method
    addField(fieldConfig, column);
  };

  return (
    <>
      {/* Toggle Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-2 top-4 z-50 rounded-md bg-primary p-2 text-white shadow-md transition-all duration-300 hover:bg-primary/90 md:hidden"
        aria-label="Toggle Toolbox"
      >
        {isOpen ? (
          <div className='flex items-center justify-center gap-2'><PanelLeftClose className="size-5" /> <span className='text-xs'>Hide</span></div>
          
        ) : (
          <div className='flex items-center justify-center gap-2'><span className='text-xs'>Add Elements</span></div>
        )}
      </button>

      {/* Sidebar Container */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-full w-64 flex-shrink-0 border-r bg-gray-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        !isOpen && "-translate-x-full",
        className
      )}>
        <ScrollArea 
          className="flex-1" 
          style={{ minHeight: '96vh', height: canvasHeight || '100%' }}
        >
          <div className={cn("bg-gray-50 flex flex-col h-max")}>
            <div className='text-lg font-semibold text-left pt-3 pl-3 max-md:pt-18'>Form Elements</div>
            <div className='p-3'>
              {Object.entries(formCategories).map(([category, { icon, items }]) => (
                <Collapsible key={category} defaultOpen className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <div className="flex w-full cursor-pointer items-center justify-between rounded-md p-3 px-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className='font-medium'>{category}</span>
                      </div>
                      <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div>
                      {items.map((item) => (
                        <div key={item.type} className="mb-1">
                          <ElementButton 
                            {...item} 
                            onAddToColumn={(column) => handleAddToColumn(item.type, column)}
                          />
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

// Export memoized component to avoid unnecessary re-renders
export const FormToolboxSidebar = memo(FormToolboxSidebarComponent);

export default FormToolboxSidebar; 