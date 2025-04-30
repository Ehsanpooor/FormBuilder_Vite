import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export interface ImageUploadProps {
  label: string;
  required: boolean;
  width: "full" | "half";
}

const ImageUpload: FC<ImageUploadProps> = ({
  label,
  required,
  width = "full"
}) => (
  <div className={`w-${width}`}>
    <Label className="mb-3">{label}</Label>
    <Input type="file" accept="image/*" required={required} className="w-full" />
  </div>
);

export default ImageUpload; 