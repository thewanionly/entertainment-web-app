import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/styles';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-body-m ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-red text-white hover:bg-red/80',
        secondary: 'bg-white text-semi-dark-blue hover:bg-white/80',
        outline:
          'border border-white text-white bg-transparent hover:border-white/80 hover:text-white/80',
        ghost: 'text-white hover:bg-greyish-blue/40',
        link: 'text-white underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-3.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type="button"
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
