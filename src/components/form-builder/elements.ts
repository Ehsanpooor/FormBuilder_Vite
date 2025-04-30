import React from 'react';
import { FieldType, NormalizedFieldData } from '@/types/form-builder';

import MultilineTextArea from '@/components/elements/MultilineTextArea';
import NumberField from '@/components/elements/NumberField';
import EmailField from '@/components/elements/EmailField';
import PasswordField from '@/components/elements/PasswordField';
import Checkboxes from '@/components/elements/Checkboxes';
import RadioButtons from '@/components/elements/RadioButtons';
import DropdownList from '@/components/elements/DropdownList';
import { DatePicker } from '@/components/elements/DatePicker';
import TimePicker from '@/components/elements/TimePicker';
import FileUpload from '@/components/elements/FileUpload';
import ImageUpload from '@/components/elements/ImageUpload';
import SignatureField from '@/components/elements/SignatureField';
import ToggleSwitch from '@/components/elements/ToggleSwitch';
import Header from '@/components/elements/Header';
import Paragraph from '@/components/elements/Paragraph';
import LineDivider from '@/components/elements/LineDivider';
import SubmitButton from '@/components/elements/SubmitButton';
import ResetClearButton from '@/components/elements/ResetClearButton';
import CustomNavigationButton from '@/components/elements/CustomNavigationButton';
import { SingleLineTextInput } from '../elements';

// Map of element types to their respective components
export const ELEMENT_COMPONENTS: Record<FieldType, React.ComponentType<any>> = {
  text: SingleLineTextInput,
  textarea: MultilineTextArea,
  number: NumberField,
  email: EmailField,
  password: PasswordField,
  checkbox: Checkboxes,
  radio: RadioButtons,
  select: DropdownList,
  date: DatePicker,
  time: TimePicker,
  file: FileUpload,
  image: ImageUpload,
  signature: SignatureField,
  toggle: ToggleSwitch,
  header: Header,
  paragraph: Paragraph,
  divider: LineDivider,
  submit: SubmitButton,
  reset: ResetClearButton,
  custom: CustomNavigationButton,
};

// Renders the appropriate form element based on its type
export const renderFormElement = (element: NormalizedFieldData, isPreview = false): React.ReactElement => {
  const Component = ELEMENT_COMPONENTS[element.type];
  
  if (!Component) {
    console.warn(`No component found for element type: ${element.type}`);
    return React.createElement('div', {}, `Unknown element type: ${element.type}`);
  }
  
  return React.createElement(Component, { element, isPreview });
}; 