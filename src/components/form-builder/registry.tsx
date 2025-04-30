import { 
  MultilineTextArea,
  DropdownList,
  DatePicker,
  TimePicker,
  ImageUpload,
  ToggleSwitch,
  RadioButtons,
  SubmitButton,
  ResetClearButton,
  CustomNavigationButton,
  Header,
  Paragraph,
  LineDivider,
  SingleLineTextInput,
  FileUpload
} from '@/components/elements';
import SingleCheckbox from '@/components/elements/SingleCheckbox';

import { FieldType, NormalizedFieldData } from '@/types/form-builder';
import { 
  TextIcon, 
  AlignJustify, 
  Hash, 
  Mail, 
  Lock, 
  CheckSquare, 
  List, 
  ListChecks,
  Calendar, 
  Clock, 
  File, 
  Image, 
  Edit2, 
  ToggleLeft,
  Heading1,
  Type,
  Minus,
  Send,
  RotateCcw,
  Plus,
} from 'lucide-react';

// Generic props interface for all field components
export interface BaseFieldProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: any) => void;
  value?: any;
}

// Registry of all field configurations
export const fieldRegistry: Record<FieldType, any> = {
  text: {
    component: SingleLineTextInput,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      placeholder: data.config.placeholder,
      maxLength: data.config.maxLength,
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {
      placeholder: 'Enter text...',
      maxLength: 100
    },
    label: 'Text Input',
    icon: <TextIcon className="h-4 w-4" />
  },
  textarea: {
    component: MultilineTextArea,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      placeholder: data.config.placeholder,
      rows: data.config.rows,
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {
      placeholder: 'Enter text...',
      rows: 4
    },
    label: 'Text Area',
    icon: <AlignJustify className="h-4 w-4" />
  },
  number: {
    component: SingleLineTextInput,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      type: 'number',
      min: data.config.min,
      max: data.config.max,
      step: data.config.step,
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {
      min: 0,
      max: 100,
      step: 1
    },
    label: 'Number',
    icon: <Hash className="h-4 w-4" />
  },
  email: {
    component: SingleLineTextInput,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      type: 'email',
      placeholder: data.config.placeholder,
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {
      placeholder: 'Enter email...'
    },
    label: 'Email',
    icon: <Mail className="h-4 w-4" />
  },
  password: {
    component: SingleLineTextInput,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      type: 'password',
      placeholder: data.config.placeholder,
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {
      placeholder: 'Enter password...'
    },
    label: 'Password',
    icon: <Lock className="h-4 w-4" />
  },
  checkbox: {
    component: SingleCheckbox,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      width: "full",
      ...data.config
    }),
    defaultConfig: {},
    label: 'Checkbox',
    icon: <CheckSquare className="h-4 w-4" />
  },
  select: {
    component: DropdownList,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      options: data.config.options,
      placeholder: data.config.placeholder,
      ...data.config
    }),
    defaultConfig: {
      placeholder: 'Select an option...',
      options: []
    },
    label: 'Select',
    icon: <List className="h-4 w-4" />
  },
  radio: {
    component: RadioButtons,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      options: data.config.options || [],
      width: "full",
      defaultOptionIndex: 0,
      ...data.config
    }),
    defaultConfig: {
      options: ['Option 1', 'Option 2', 'Option 3'],
      defaultOptionIndex: 0
    },
    label: 'Radio Group',
    icon: <ListChecks className="h-4 w-4" />
  },
  date: {
    component: DatePicker,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      minDate: data.config.minDate,
      maxDate: data.config.maxDate,
      ...data.config
    }),
    defaultConfig: {},
    label: 'Date Picker',
    icon: <Calendar className="h-4 w-4" />
  },
  time: {
    component: TimePicker,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      ...data.config
    }),
    defaultConfig: {},
    label: 'Time Picker',
    icon: <Clock className="h-4 w-4" />
  },
  file: {
    component: FileUpload,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      accept: data.config.accept,
      multiple: data.config.multiple,
      ...data.config
    }),
    defaultConfig: {
      accept: '*/*',
      multiple: false
    },
    label: 'File Upload',
    icon: <File className="h-4 w-4" />
  },
  image: {
    component: ImageUpload,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      accept: 'image/*',
      multiple: data.config.multiple,
      ...data.config
    }),
    defaultConfig: {
      multiple: false
    },
    label: 'Image Upload',
    icon: <Image className="h-4 w-4" />
  },
  signature: {
    component: SingleLineTextInput,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {},
    label: 'Signature',
    icon: <Edit2 className="h-4 w-4" />
  },
  toggle: {
    component: ToggleSwitch,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      label: data.label,
      required: data.required,
      ...data.config
    }),
    defaultConfig: {},
    label: 'Toggle',
    icon: <ToggleLeft className="h-4 w-4" />
  },
  header: {
    component: Header,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      level: data.config.level ?? 2,
      label: data.label,
      textAlign: data.config.textAlign || 'left',
      ...data.config
    }),
    defaultConfig: {
      level: 2,
      textAlign: 'left',
    },
    label: 'Heading',
    icon: <Heading1 className="h-4 w-4" />
  },
  paragraph: {
    component: Paragraph,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      children: data.label,
      textAlign: data.config.textAlign || 'left',
      ...data.config
    }),
    defaultConfig: {
      textAlign: 'left',
    },
    label: 'Paragraph',
    icon: <Type className="h-4 w-4" />
  },
  divider: {
    component: LineDivider,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      ...data.config
    }),
    defaultConfig: {},
    label: 'Divider',
    icon: <Minus className="h-4 w-4" />
  },
  submit: {
    component: SubmitButton,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      children: data.label,
      type: 'submit',
      variant: 'default',
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {},
    label: 'Submit Button',
    icon: <Send className="h-4 w-4" />
  },
  reset: {
    component: ResetClearButton,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      children: data.label,
      type: 'reset',
      variant: 'outline',
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {},
    label: 'Reset Button',
    icon: <RotateCcw className="h-4 w-4" />
  },
  custom: {
    component: CustomNavigationButton,
    mapProps: (data: NormalizedFieldData) => ({
      id: data.id,
      children: data.label,
      type: 'button',
      variant: 'secondary',
      width: data.config.width || 'full',
      ...data.config
    }),
    defaultConfig: {},
    label: 'Custom Button',
    icon: <Plus className="h-4 w-4" />
  }
};

// Helper function to create a new field
export const createField = (type: FieldType, overrides: Partial<NormalizedFieldData> = {}): NormalizedFieldData => {
  const config = fieldRegistry[type];
  return {
    id: crypto.randomUUID(),
    type,
    label: config.label,
    required: false,
    column: 'left',
    config: { ...config.defaultConfig },
    ...overrides
  };
};

// Helper function to render a field
export const renderField = (data: NormalizedFieldData) => {
  const config = fieldRegistry[data.type];
  if (!config) return null;

  const Component = config.component;
  const props = config.mapProps(data);

  return <Component {...props} />;
}; 