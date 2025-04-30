import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export interface EmailFieldProps {
  label: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
}

const EmailField: FC<EmailFieldProps> = ({
  label,
  placeholder,
  required,
  width,
}) => (
  <div className={width === "full" ? "w-full" : "w-1/2"}>
    <Label>{label}</Label>
    <Input type="email" placeholder={placeholder} required={required} />
  </div>
);

export default EmailField; 