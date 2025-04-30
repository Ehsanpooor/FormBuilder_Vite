import { ReactNode } from 'react';

// Field Types
export type FieldType = 
  | 'text' 
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'time'
  | 'file'
  | 'image'
  | 'signature'
  | 'toggle'
  | 'header'
  | 'paragraph'
  | 'divider'
  | 'submit'
  | 'reset'
  | 'custom';

// Column definitions
export type ColumnName = 'left' | 'right';

// Field configuration interface
export interface FieldConfig {
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  minDate?: string;
  maxDate?: string;
  accept?: string;
  multiple?: boolean;
  level?: number;
  variant?: string;
  [key: string]: any;
}

// Normalized field data structure
export interface NormalizedFieldData {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  column?: ColumnName;
  config: FieldConfig;
}

// Drag-related data
export interface DragItem {
  id: string;
  type: FieldType;
  isNew: boolean;
  fromColumn?: ColumnName;
  fromIndex?: number;
  toIndex?: number;
}

// Props for the FormBuilder component
export interface FormBuilderProps {
  onSave?: (formState: FormState) => void;
  initialState?: Partial<FormState>;
  className?: string;
}

// Props for the Canvas component
export interface CanvasProps {
  className?: string;
}

// Props for the PropertiesPanel component
export interface PropertiesPanelProps {
  className?: string;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveFieldId?: (id: string | null) => void;
}

// Props for draggable elements
export interface DraggableElementProps {
  id: string;
  type: FieldType;
  children: ReactNode;
}

// Props for droppable areas
export interface DroppableAreaProps {
  columnName: ColumnName;
  children: ReactNode;
}

// Form state structure
export interface FormState {
  fields: {
    byId: Record<string, NormalizedFieldData>;
    leftColumn: string[];
    rightColumn: string[];
  };
  title: string;
  description: string;
} 