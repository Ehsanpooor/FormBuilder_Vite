import { useEffect } from "react";

export default function useSubmitGuard(
    formRef: React.RefObject<HTMLElement>,
    isValid: boolean,
    onInvalid: () => void
  ) {
    useEffect(() => {
      const form = formRef.current?.closest("form");
      if (!form) return;
      const onSubmit = (e: Event) => {
        if (!isValid) {
          e.preventDefault();
          onInvalid();
        }
      };
      form.addEventListener("submit", onSubmit);
      return () => form.removeEventListener("submit", onSubmit);
    }, [formRef, isValid, onInvalid]);
  }
  