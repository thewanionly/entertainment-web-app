import * as React from 'react';

import { Button } from './Button';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button className={className} ref={ref} variant="ghost" {...props}>
        {children}
      </Button>
    );
  }
);

const IconButtonSrLabel = ({ label }: { label: string }) => (
  <span className="sr-only">{label}</span>
);

IconButton.displayName = 'IconButton';

export { IconButton, IconButtonSrLabel };
