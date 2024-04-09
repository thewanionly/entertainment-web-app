import * as React from 'react';

import { Button } from './Button';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <Button className={className} ref={ref} variant="ghost" {...props}>
        {children}
        {label && <span className="sr-only">{label}</span>}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';

export { IconButton };
