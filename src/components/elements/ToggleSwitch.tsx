import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";

export interface ToggleSwitchProps {
  label: string;
  onLabel: string;
  offLabel: string;
  defaultValue: boolean;
  width: "full" | "half";
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  label,
  onLabel,
  offLabel,
  defaultValue,
  width = "full",
}) => (
  <div className={`w-${width}`}>
    <div className={"w-full flex items-center gap-2"}>
      <div className="flex items-center">
        <span>{offLabel}</span>
        <Switch defaultChecked={defaultValue} />
        <span>{onLabel}</span>
      </div>
      <Label className="">{label}</Label>
      
    </div>
  </div>
);

export default ToggleSwitch; 