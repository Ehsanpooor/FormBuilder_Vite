import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";

export interface RadioButtonsProps {
  label: string;
  options: string[];
  defaultOptionIndex: number;
  required: boolean;
  width: "full" | "half";
}

const RadioButtons: FC<RadioButtonsProps> = ({
  label,
  options,
  defaultOptionIndex,
  required,
  width = "full",
}) => (
  <div className={`w-${width}`}>
    <Label className="mb-3">{label}</Label>
    <RadioGroup defaultValue={options[defaultOptionIndex]} className="w-full">
      {options.map((opt, i) => (
        <div key={i} className="flex items-center space-x-2">
          <RadioGroupItem value={opt} id={`radio-${opt}-${i}`} required={required} />
          <Label htmlFor={`radio-${opt}-${i}`}>{opt}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

export default RadioButtons; 