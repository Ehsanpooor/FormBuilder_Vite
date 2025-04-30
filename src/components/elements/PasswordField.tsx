import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export interface PasswordFieldProps {
  label: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
}

const PasswordField: FC<PasswordFieldProps> = ({
  label,
  placeholder,
  required,
  width,
}) => (
  <div className={width === "full" ? "w-full" : "w-1/2"}>
    <Label>{label}</Label>
    <Input type="password" placeholder={placeholder} required={required} />
  </div>
);

export default PasswordField; 