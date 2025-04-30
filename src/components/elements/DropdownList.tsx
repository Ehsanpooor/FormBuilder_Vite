import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { FC } from "react";

export interface DropdownListProps {
  label: string;
  options: string[];
  required: boolean;
  width: "full" | "half";
}

const DropdownList: FC<DropdownListProps> = ({
  label,
  options,
  required,
  width = "full",
}) => (
  <div className={`w-${width}`}>
    <Label className="mb-3">{label}</Label>
    <Select required={required}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {options && options.length > 0 ? (
          options.map((opt, i) => (
            <SelectItem key={i} value={opt}>
              {opt}
            </SelectItem>
          ))
        ) : (
          <div className="px-2 py-1 text-muted-foreground text-sm">No options</div>
        )}
      </SelectContent>
    </Select>
  </div>
);

export default DropdownList; 