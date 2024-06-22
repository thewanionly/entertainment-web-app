import React from 'react';

import { Search } from '@/components/app-specific/Icon';
import { Input } from '@/components/generic/Input';
import { cn } from '@/utils/styles';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, disabled, ...rest }, ref) => {
    return (
      <div className={cn('flex gap-4 sm:gap-6', className)}>
        <Search
          className={cn('size-6 text-white sm:size-8', disabled && 'text-white/30')}
          title="search icon"
        />
        <Input
          {...rest}
          ref={ref}
          className={cn(
            'flex-1 border-none p-0 pt-0.5 font-light sm:pt-0 sm:text-heading-m',
            'relative after:absolute after:-bottom-2.5 after:h-px after:w-full after:bg-greyish-blue after:opacity-0 sm:after:-bottom-3.5',
            'focus-within:after:opacity-100 motion-safe:after:transition-opacity'
          )}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
    );
  }
);

SearchBar.displayName = 'Input';

export { SearchBar };
