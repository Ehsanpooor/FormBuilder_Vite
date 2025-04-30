import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FC } from "react";

export interface MultilineTextAreaProps {
  label?: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MultilineTextArea: FC<MultilineTextAreaProps> = ({
  label,
  placeholder,
  required,
  width,
  value,
  onChange,
}) => (
  <div className={cn(width === "full" ? "w-full" : "w-1/2", "gap-3 flex flex-col")}>
    {label && <Label>{label}</Label>}
    <Textarea 
      placeholder={placeholder} 
      required={required} 
      value={value}
      onChange={onChange}
    />
  </div>
);

export default MultilineTextArea; 