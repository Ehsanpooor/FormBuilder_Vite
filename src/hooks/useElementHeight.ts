import { useEffect, useState } from 'react';

export function useElementHeight(elementId: string) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const updateHeight = () => {
      const newHeight = element.offsetHeight;
      setHeight(newHeight);
    };

    // Initial measurement
    updateHeight();

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [elementId]);

  return height;
} 