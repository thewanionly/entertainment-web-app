import { ReactNode } from 'react';

import { cn } from '@/utils/styles';

type MediaSectionProps = {
  children: ReactNode;
  className?: string;
};

export const MediaSection = ({ children, className }: MediaSectionProps) => {
  return (
    <section className={cn('mx-auto w-[91.467%] lg:w-full lg:px-9 2xl:pr-0', className)}>
      {children}
    </section>
  );
};
