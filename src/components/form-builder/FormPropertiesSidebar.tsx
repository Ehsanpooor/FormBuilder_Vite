import React, { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { PropertiesPanel } from './PropertiesPanel';

interface FormPropertiesSidebarProps {
  propertiesOpen: boolean;
  contentVisible: boolean;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  onCloseSidebar: () => void;
}

const FormPropertiesSidebarComponent: React.FC<FormPropertiesSidebarProps> = ({
  propertiesOpen,
  contentVisible,
  sidebarRef,
  onCloseSidebar,
}) => {
   
  // Memoize the style objects to prevent unnecessary recalculations
  const sidebarStyle = useMemo(() => ({
    minWidth: propertiesOpen ? '20rem' : '0',
    maxWidth: propertiesOpen ? '20rem' : '0',
  }), [propertiesOpen]);
  
  const contentStyle = useMemo(() => ({
    transitionProperty: 'opacity'
  }), []);
  
  // Only render PropertiesPanel when it's actually visible to save resources
  const propertiesPanelContent = useMemo(() => {
    if (!contentVisible) return null;
    return <PropertiesPanel closeSidebar={onCloseSidebar} />;
  }, [contentVisible, onCloseSidebar]);
  
  return (
    <div
      ref={sidebarRef}
      className={cn(
        "transition-all duration-300 border-l bg-white shadow-lg max-xl:absolute max-xl:h-full max-xl:right-0 max-xl:top-0",
        propertiesOpen ? "w-80" : "w-0 overflow-hidden"
      )}
      style={sidebarStyle}
    >
      <div
        className={cn(
          "transition-opacity duration-300 h-full",
          contentVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={contentStyle}
      >
        {propertiesPanelContent}
      </div>
    </div>
  );
};

// Export memoized component to avoid unnecessary re-renders
export const FormPropertiesSidebar = memo(FormPropertiesSidebarComponent); 