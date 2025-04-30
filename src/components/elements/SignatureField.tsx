import { Label } from "@/components/ui/label";
import { FC, useRef, useState } from "react";
import useSubmitGuard from "@/hooks/useSubmitGuard";

export interface SignatureFieldProps {
  label: string;
  required: boolean;
  width: "full" | "half";
}

const SignatureField: FC<SignatureFieldProps> = ({
  label,
  required,
  width,
}) => {
  const [hasSignature, setHasSignature] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useSubmitGuard(ref as React.RefObject<HTMLElement>, hasSignature || !required, () => setHasError(true));

  return (
    <div ref={ref} className={width === "full" ? "w-full" : "w-1/2"}>
      <Label className={hasError ? "text-red-600 mb-1" : "mb-1"}>
        {label} {required && <span>*</span>}
      </Label>
      <div className={`border border-dashed rounded h-24 flex items-center justify-center text-gray-400 ${hasError ? "border-red-600" : ""}`}>
        Signature Field (draw here)
        {/* Placeholder button to simulate signing */}
        {!hasSignature && (
          <button type="button" className="ml-2 text-blue-500 underline" onClick={() => { setHasSignature(true); setHasError(false); }}>
            Sign
          </button>
        )}
      </div>
    </div>
  );
};

export default SignatureField; 