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
          className={
            'flex-1 border-transparent p-0 pb-3.5 pt-0.5 text-[1rem] font-light focus-within:border-greyish-blue sm:pt-0 sm:text-heading-m'
          }
          disabled={disabled}
        />
      </div>
    );
  }
);

SearchBar.displayName = 'Input';

export { SearchBar };
