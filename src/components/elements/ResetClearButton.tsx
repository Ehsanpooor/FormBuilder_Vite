import { Button } from "@/components/ui/button";
import { FC } from "react";

export interface ResetClearButtonProps {
  buttonText: string;
  width: "full" | "half";
}

const ResetClearButton: FC<ResetClearButtonProps> = ({ buttonText, width }) => (
  <Button className={width === "full" ? "w-full" : "w-1/2"} type="reset" variant="secondary">
    {buttonText || "Reset Form"}
  </Button>
);

export default ResetClearButton; 