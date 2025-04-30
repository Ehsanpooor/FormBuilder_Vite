import { Button } from "@/components/ui/button";
import { FC } from "react";

export interface SubmitButtonProps {
  buttonText: string;
  width: "full" | "half";
}

const SubmitButton: FC<SubmitButtonProps> = ({ buttonText, width }) => (
  <Button className={width === "full" ? "w-full" : "w-1/2"} type="submit">
    {buttonText || "Submit"}
  </Button>
);

export default SubmitButton; 