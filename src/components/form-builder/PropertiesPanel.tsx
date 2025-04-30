import React, { FormEvent, useState, useTransition, useEffect } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import MultilineTextArea from '@/components/elements/MultilineTextArea';
import { useFormBuilder } from '@/hooks/useFormBuilder';
import { PropertiesPanelProps } from '@/types/form-builder';
import type { NormalizedFieldData } from '@/types/form-builder';
import { cn } from '@/lib/utils';
import { Plus, Trash, X } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export const PropertiesPanel: React.FC<PropertiesPanelProps & { closeSidebar?: () => void }> = ({ className, closeSidebar }) => {
  const {
    title,
    description,
    activeFieldId,
    getFieldById,
    setTitle: updateFormTitle,
    setDescription: updateFormDescription,
    updateField,
    removeField
  } = useFormBuilder();

  const [, startTransition] = useTransition();
  const activeElement = activeFieldId ? getFieldById(activeFieldId) : null;

  // State for unsaved changes
  const [pendingChanges, setPendingChanges] = useState<Partial<NormalizedFieldData>>({});

  // Tab state: 'element' or 'form'
  const [tab, setTab] = useState<'element' | 'form'>(activeElement ? 'element' : 'form');

  useEffect(() => {
    if (activeElement) setTab('element');
    else setTab('form');
  }, [activeElement]);

  const handlePropertyChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const isCheckbox = type === 'checkbox';
    const propertyValue = isCheckbox 
      ? (e.target as HTMLInputElement).checked 
      : value;

    if (name === 'required') {
      setPendingChanges({
        ...pendingChanges,
        required: propertyValue as boolean
      });
      return;
    }

    if (name === 'label') {
      setPendingChanges({
        ...pendingChanges,
        label: value
      });
      return;
    }

    setPendingChanges({
      ...pendingChanges,
      config: {
        ...(pendingChanges.config || {}),
        [name]: value
      }
    });
  };

  const applyChanges = () => {
    if (activeFieldId && Object.keys(pendingChanges).length > 0) {
      startTransition(() => {
        updateField(activeFieldId, pendingChanges);
        setPendingChanges({});
      });
    }
  };

  const handleFormTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    startTransition(() => {
      updateFormTitle(value);
    });
  };

  const handleFormDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    startTransition(() => {
      updateFormDescription(value);
    });
  };

  // OptionListEditor: for editing dropdown/radio options
  const OptionListEditor: React.FC<{
    options: string[];
    onChange: (options: string[]) => void;
    label?: string;
  }> = ({ options, onChange, label }) => {
    const [newOption, setNewOption] = useState('');

    const handleAdd = () => {
      if (newOption.trim() && !options.includes(newOption.trim())) {
        onChange([...options, newOption.trim()]);
        setNewOption('');
      }
    };

    const handleRemove = (idx: number) => {
      onChange(options.filter((_, i) => i !== idx));
    };

    return (
      <div className="space-y-2 pl-4 pr-4">
        {label && <Label>{label}</Label>}
        <div className="flex gap-2">
          <Input
            value={newOption}
            onChange={e => setNewOption(e.target.value)}
            placeholder="Add new option"
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
          />
          <Button type="button" variant="outline" onClick={handleAdd} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Button type="button" variant="outline" className="flex-1 justify-start" disabled>
                {opt}
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={() => handleRemove(idx)}>
                <Trash className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };



  // Add a helper to check field type
  const isTextAlignField = (type: string) => type === 'header' || type === 'paragraph';
  const isButtonField = (type: string) => type === 'submit' || type === 'reset' || type === 'custom';

  // Helper for placeholder fields
  const hasPlaceholder = (type: string) => (
    type === 'text' || type === 'textarea' || type === 'email' || type === 'password' || type === 'number'
  );

  return (
    <div className={cn("", className)}>
      <div className='flex flex-col  gap-2'>
        <div className='flex items-center gap-2 w-full justify-between p-4'>
        <p className='text-lg font-semibold'>Properties</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeSidebar}
        >
          <X className='w-4 h-4' />
        </Button>
        </div>
    
      
    
          <Tabs value={tab} onValueChange={(v) => setTab(v as 'element' | 'form')} className="w-full">
            <div className='pl-4 pr-4'>
            <TabsList className="w-full mb-4">
              <TabsTrigger className="flex-1" value="element">Element</TabsTrigger>
              <TabsTrigger className="flex-1" value="form">Form</TabsTrigger>
            </TabsList>
            </div>
            <TabsContent value="element" className="space-y-4">
              {activeElement ? (
                <div className="space-y-4">
                  {/* Label input (not for header, paragraph, button) */}
                  {!isTextAlignField(activeElement.type) && !isButtonField(activeElement.type) && (
                    <div className='flex flex-col gap-2  pl-4 pr-4'>
                      <Label htmlFor="label">Label</Label>
                      <Input
                        id="label"
                        name="label"
                        value={pendingChanges.label ?? activeElement.label}
                        onChange={handlePropertyChange}
                        onBlur={applyChanges}
                      />
                    </div>
                  )}
                  {/* Placeholder input (only for certain fields) */}
                  {hasPlaceholder(activeElement.type) && !isTextAlignField(activeElement.type) && !isButtonField(activeElement.type) && (
                    <div className='flex flex-col gap-2  pl-4 pr-4'>
                      <Label htmlFor="placeholder">Placeholder</Label>
                      <Input
                        id="placeholder"
                        name="placeholder"
                        value={pendingChanges.config?.placeholder ?? activeElement.config.placeholder ?? ''}
                        onChange={handlePropertyChange}
                        onBlur={applyChanges}
                      />
                    </div>
                  )}
                  {/* Text align for header/paragraph (shadcn Select) */}
                  {isTextAlignField(activeElement.type) && (
                    <div className='flex flex-col gap-2  pl-4 pr-4'>
                      <Label htmlFor="textAlign">Text Align</Label>
                      <Select
                        value={pendingChanges.config?.textAlign ?? activeElement.config.textAlign ?? 'left'}
                        onValueChange={val => {
                          startTransition(() => {
                            updateField(activeFieldId!, {
                              config: {
                                ...(pendingChanges.config || activeElement.config || {}),
                                textAlign: val
                              }
                            });
                          });
                          setPendingChanges({
                            ...pendingChanges,
                            config: {
                              ...(pendingChanges.config || {}),
                              textAlign: val
                            }
                          });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {/* Button text for button fields */}
                  {isButtonField(activeElement.type) && (
                    <div className='flex flex-col gap-2  pl-4 pr-4'>
                      <Label htmlFor="btnText">Button Text</Label>
                      <Input
                        id="btnText"
                        name="btnText"
                        value={pendingChanges.config?.btnText ?? activeElement.config.btnText ?? ''}
                        onChange={handlePropertyChange}
                        onBlur={applyChanges}
                      />
                    </div>
                  )}
                  {/* Required switch (not for header, paragraph, button, radio) */}
                  {!isTextAlignField(activeElement.type) && !isButtonField(activeElement.type) && activeElement.type !== 'radio' && (
                    <div className='flex items-center gap-2 pl-4 pr-4'>
                      <Checkbox
                        id="required"
                        name="required"
                        checked={pendingChanges.required ?? activeElement.required}
                        onCheckedChange={(checked) => {
                          setPendingChanges({ ...pendingChanges, required: checked === true });
                          startTransition(() => {
                            updateField(activeFieldId!, { required: checked === true });
                          });
                        }}
                      />
                      <Label htmlFor="required">Make this field required</Label>
                      
                    </div>
                  )}
                  {/* OptionListEditor for select/radio */}
                  {(activeElement.type === 'select' || activeElement.type === 'radio') && (
                    <OptionListEditor
                      options={pendingChanges.config?.options ?? activeElement.config.options ?? []}
                      onChange={opts => {
                        setPendingChanges({
                          ...pendingChanges,
                          config: {
                            ...(pendingChanges.config || {}),
                            options: opts
                          }
                        });
                        // Immediately apply the change to the form field
                        startTransition(() => {
                          updateField(activeFieldId!, {
                            config: {
                              ...(pendingChanges.config || activeElement.config || {}),
                              options: opts
                            }
                          });
                        });
                      }}
                      label="Options"
                    />
                  )}
                  {/* Heading level for header fields */}
                  {activeElement.type === 'header' && (
                    <div className='flex flex-col gap-2  pl-4 pr-4'>
                      <Label htmlFor="level">Heading Level</Label>
                      <Select
                        value={String(pendingChanges.config?.level ?? activeElement.config.level ?? 2)}
                        onValueChange={val => {
                          const levelNum = Number(val);
                          startTransition(() => {
                            updateField(activeFieldId!, {
                              config: {
                                ...(pendingChanges.config || activeElement.config || {}),
                                level: levelNum
                              }
                            });
                          });
                          setPendingChanges({
                            ...pendingChanges,
                            config: {
                              ...(pendingChanges.config || {}),
                              level: levelNum
                            }
                          });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">H1</SelectItem>
                          <SelectItem value="2">H2</SelectItem>
                          <SelectItem value="3">H3</SelectItem>
                          <SelectItem value="4">H4</SelectItem>
                          <SelectItem value="5">H5</SelectItem>
                          <SelectItem value="6">H6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                   <Separator className='mt-6' />
                  <div className='pl-4 pr-4 w-full flex justify-end gap-2' >
                  <Button 
                      variant="outline" 
                      size="sm"
                      onClick={closeSidebar}
                    >
                      Done
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => activeFieldId && removeField(activeFieldId)}
                    >
                      Remove Element
                    </Button>
                    
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Select an element to edit its properties</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="form" className="space-y-4 pl-4 pr-4">
              <div className='flex flex-col gap-2'>
                <Label htmlFor="formTitle">Form Title</Label>
                <Input
                  id="formTitle"
                  value={title}
                  onChange={handleFormTitleChange}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor="formDescription">Form Description</Label>
                <MultilineTextArea
                  placeholder="Enter form description"
                  required={false}
                  width="full"
                  // MultilineTextArea expects onChange to be compatible with Textarea
                  // so we pass a synthetic event
                  // @ts-ignore
                  value={description}
                  onChange={handleFormDescriptionChange}
                />
              </div>
            </TabsContent>
          </Tabs>
    </div>
    </div>
  );
};

export default PropertiesPanel;