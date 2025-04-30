import { Button } from "@/components/ui/button";
import { FC } from "react";

export interface CustomNavigationButtonProps {
  buttonText: string;
  width: "full" | "half";
}

const CustomNavigationButton: FC<CustomNavigationButtonProps> = ({ buttonText, width }) => (
  <Button className={width === "full" ? "w-full" : "w-1/2 "} type="button" variant='outline'>
    {buttonText || "Text"}
  </Button>
);

export default CustomNavigationButton; 