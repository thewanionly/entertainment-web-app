import { ReactNode } from 'react';

import { cn } from '@/utils/styles';

type MediaSectionGridProps = {
  children: ReactNode;
  className?: string;
};

export const MediaSectionGrid = ({ children, className }: MediaSectionGridProps) => {
  return (
    <ul
      className={cn(
        'relative w-full',
        'grid grid-cols-2 gap-4',
        'xs:grid-cols-1',
        'sm:grid-cols-3 sm:gap-x-[1.875rem] sm:gap-y-6',
        'lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8',
        className
      )}
    >
      {children}
    </ul>
  );
};
