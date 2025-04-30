import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FC } from "react";

export interface SingleCheckboxProps {
  label: string;
  required?: boolean;
  width?: "full" | "half";
}

const SingleCheckbox: FC<SingleCheckboxProps> = ({
  label,
  required = false,
  width = "full"
}) => (
  <div className={width === "full" ? "w-full" : "w-1/2"}>
    <div className="flex items-center space-x-2">
      <Checkbox id={`checkbox-${label}`} required={required} />
      <Label htmlFor={`checkbox-${label}`}>{label}</Label>
    </div>
  </div>
);

export default SingleCheckbox; 