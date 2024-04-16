import * as React from 'react';

import { cn } from '@/utils/styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = '', disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          'peer flex items-center gap-4 border-b-[1px] border-greyish-blue p-4 text-body-m',
          'focus-within:border-white',
          error && 'border-red focus-within:border-red',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <input
          type={type}
          className={cn(
            'leading-none',
            'flex w-full flex-1 bg-transparent text-white caret-red ring-offset-white',
            'focus:outline-none',
            'placeholder:text-white/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'file:text-sm file:border-0 file:bg-transparent file:font-medium'
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {error && <span className="text-body-s text-red">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
