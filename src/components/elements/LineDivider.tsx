import { FC } from "react";

export interface LineDividerProps {
  style: "solid" | "dashed" | "dotted";
  color: string;
}

const LineDivider: FC<LineDividerProps> = ({ style, color }) => (
  <hr className="my-4" style={{ borderStyle: style, borderColor: color }} />
);

export default LineDivider; 