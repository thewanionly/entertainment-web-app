import { ReactNode } from 'react';

import { cn } from '@/utils/styles';

type MediaSectionTitleProps = {
  children: ReactNode;
  titleTag?: keyof JSX.IntrinsicElements;
  className?: string;
};

export const MediaSectionTitle = ({
  children,
  titleTag: TitleTag = 'h2',
  className,
}: MediaSectionTitleProps) => {
  return (
    <TitleTag
      className={cn(
        'inline-block capitalize',
        'mb-6 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
        'sm:text-heading-l lg:mb-8',
        className
      )}
    >
      {children}
    </TitleTag>
  );
};
