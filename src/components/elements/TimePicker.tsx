import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export interface TimePickerProps {
  label: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
}

const TimePicker: FC<TimePickerProps> = ({
  label,
  placeholder,
  required,
  width = "full"
}) => (
  <div className={`w-${width}`}>
    <Label className="mb-3">{label}</Label>
    <Input type="time" placeholder={placeholder} required={required} />
  </div>
);

export default TimePicker; 