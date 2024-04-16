import React from 'react';

import { Search } from '@/components/app-specific/Icon';
import { Input } from '@/components/generic/Input';
import { cn } from '@/utils/styles';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, disabled, ...rest }, ref) => {
    return (
      <div className={cn('flex gap-6', className)}>
        <Search
          className={cn('h-8 w-8 text-white', disabled && 'text-white/30')}
          title="search icon"
        />
        <Input
          {...rest}
          ref={ref}
          className={
            'flex-1 border-transparent p-0 pb-[15px] text-heading-m focus-within:border-greyish-blue'
          }
          disabled={disabled}
        />
      </div>
    );
  }
);

SearchBar.displayName = 'Input';

export { SearchBar };
