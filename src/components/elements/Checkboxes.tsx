import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FC } from "react";

export interface CheckboxesProps {
  label: string;
  options: string[];
  required: boolean;
  width: "full" | "half";
}

const Checkboxes: FC<CheckboxesProps> = ({
  label,
  options,
  required,
  width,
}) => (
  <div className={width === "full" ? "w-full" : "w-1/2"}>
    <Label>{label}</Label>
    <div className="flex flex-col gap-2">
      {options.map((opt, i) => (
        <div key={i} className="grid w-full max-w-sm items-center gap-1.5">
          <Checkbox id={`checkbox-${opt}-${i}`} required={required} />
          <Label htmlFor={`checkbox-${opt}-${i}`}>{opt}</Label>
        </div>
      ))}
    </div>
  </div>
);

export default Checkboxes; 