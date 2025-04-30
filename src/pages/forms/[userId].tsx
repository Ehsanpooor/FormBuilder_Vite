import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fieldRegistry } from '@/components/form-builder/registry';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  title: string;
  description: string;
  fields: any;
}

const PublicFormPage: React.FC = () => {
  const params = useParams();
  const userId = params.userId || 'user';
  const [form, setForm] = useState<FormData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const key = `formBuilder:form:${userId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setForm(parsed);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error parsing form data:', e);
      }
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Store the submitted data
    const submissionKey = `formBuilder:submission:${userId}`;
    localStorage.setItem(submissionKey, JSON.stringify(data));
    
    setIsSubmitted(true);
  };

  if (!form) {
    return <div className="p-8 text-center">No form found for this user.</div>;
  }

  const leftCount = form.fields.leftColumn.length;
  const rightCount = form.fields.rightColumn.length;
  const isOneCol = leftCount === 0 || rightCount === 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-muted py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {form.title?.trim() ? form.title : 'Form Header'}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          {form.description?.trim() ? form.description : 'Form Description'}
        </p>
      </div>

      {/* Card with form fields */}
      <Card className={cn(
        "w-full shadow-lg relative overflow-hidden",
        isOneCol ? "max-w-[25rem]" : "max-w-[52rem]"
      )}> 
        <CardContent >
          <div className={cn(
            "transition-transform duration-500 ease-in-out min-h-[200px]",
            isSubmitted && "-translate-x-full"
          )}>
            <form onSubmit={handleSubmit} name="publicForm">
              <CardContent className="py-6 sm:py-8">
                <div className={cn(
                  "flex flex-col gap-4",
                  !isOneCol && "md:flex-row md:gap-8"
                )}>
                  {/* Left Column */}
                  <div className={cn(
                    "space-y-4",
                    !isOneCol && "md:flex-1"
                  )}>
                    {form.fields.leftColumn.map((fieldId: string) => {
                      const field = form.fields.byId[fieldId];
                      if (!field) return null;
                      const registry = fieldRegistry[field.type as import('@/types/form-builder').FieldType];
                      if (!registry) return null;
                      const FieldComponent = registry.component;
                      const props = registry.mapProps(field);
                      return (
                        <div key={field.id} className="mb-4">
                          <FieldComponent {...props} name={field.id} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column */}
                  {rightCount > 0 && (
                    <div className={cn(
                      "space-y-4",
                      !isOneCol && "md:flex-1"
                    )}>
                      {form.fields.rightColumn.map((fieldId: string) => {
                        const field = form.fields.byId[fieldId];
                        if (!field) return null;
                        const registry = fieldRegistry[field.type as import('@/types/form-builder').FieldType];
                        if (!registry) return null;
                        const FieldComponent = registry.component;
                        const props = registry.mapProps(field);
                        return (
                          <div key={field.id} className="mb-4">
                            <FieldComponent {...props} name={field.id} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </form>
          </div>

          {/* Success Message */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center bg-white transition-transform duration-500 ease-in-out translate-x-full min-h-[200px]",
            isSubmitted && "translate-x-0"
          )}>
            <div className={cn(
              "rounded-full bg-green-100 p-3 mb-4 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] scale-0",
              isSubmitted && "scale-100 delay-300"
            )}>
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className={cn(
              "text-lg sm:text-xl font-semibold text-green-600 mb-2 transition-all duration-500 opacity-0 translate-y-5",
              isSubmitted && "opacity-100 translate-y-0 delay-400"
            )}>
              Form Submitted
            </h3>
            <p className={cn(
              "text-sm text-muted-foreground transition-opacity duration-500 opacity-0",
              isSubmitted && "opacity-100 delay-500"
            )}>
              Your response has been recorded
            </p>
          </div>
        </CardContent>

        <CardFooter className="relative z-30 flex justify-center border-t pt-4 sm:pt-6 pb-2 text-muted-foreground text-xs">
          This form was created by <span className="font-semibold ml-1">Form Builder</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PublicFormPage; 