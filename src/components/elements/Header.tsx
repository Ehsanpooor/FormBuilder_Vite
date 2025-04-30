import React from 'react';
import { FC } from "react";

export interface HeaderProps {
  label?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign?: 'left' | 'center' | 'right';
}

const levelClassMap: Record<number, string> = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-semibold',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-medium',
  5: 'text-lg font-medium',
  6: 'text-base font-medium',
};

const Header: FC<HeaderProps> = ({
  label,
  level = 2,
  textAlign = 'left',
  ...props
}) => {
  const text = label?.trim() || '';
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const sizeClass = levelClassMap[level] || levelClassMap[2];
  return React.createElement(
    Tag as string,
    {
      className: `${sizeClass} ${text ? '' : 'text-muted-foreground italic'}`,
      style: { textAlign },
      ...props
    },
    text || 'Header (placeholder)'
  );
};

export default Header; 