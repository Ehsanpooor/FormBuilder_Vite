import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export interface FileUploadProps {
  label: string;
  required: boolean;
  width: "full" | "half";
}

const FileUpload: FC<FileUploadProps> = ({
  label,
  required,
  width = "full"
}) => (
  <div className={`w-${width}`}>
    <Label className="mb-3">{label}</Label>
    <Input type="file" accept="*" required={required} className="w-full" />
  </div>
);

export default FileUpload; 