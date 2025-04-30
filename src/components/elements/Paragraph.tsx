import { FC } from 'react';
import { ReactNode } from "react";

export interface ParagraphProps {
  children?: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
}

const Paragraph: FC<ParagraphProps> = ({ children, textAlign = 'left' }) => {
  const text = typeof children === 'string' ? children.trim() : '';
  return (
    <p className={text ? '' : 'text-muted-foreground italic'} style={{ textAlign }}>
      {text || 'Paragraph (placeholder)'}
    </p>
  );
};

export default Paragraph; 