import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { cn } from '@/lib/utils';

export interface SingleLineTextInputProps {
  label: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
}

const SingleLineTextInput: FC<SingleLineTextInputProps> = ({
  label,
  placeholder,
  required,
  width,
}) => (
  <div className={cn(width === "full" ? "w-full" : "w-1/2", "grid w-full max-w-sm items-center gap-1.5")}>
        <Label>{label}</Label>
    <Input placeholder={placeholder} required={required} />

  </div>
);

export default SingleLineTextInput; 