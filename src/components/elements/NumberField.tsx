import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export interface NumberFieldProps {
  label: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
}

const NumberField: FC<NumberFieldProps> = ({
  label,
  placeholder,
  required,
  width,
}) => (
  <div className={width === "full" ? "w-full" : "w-1/2"}>
    <Label>{label}</Label>
    <Input type="number" placeholder={placeholder} required={required} />
  </div>
);

export default NumberField; 