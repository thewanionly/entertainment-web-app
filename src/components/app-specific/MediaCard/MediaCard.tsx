import { ReactNode } from 'react';

import { cn } from '@/utils/styles';

import { MediaCardContextProvider } from './MediaCard.context';

type MediaCardProps = {
  className?: string;
  children: ReactNode;
  isBookmarked?: boolean;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
};

export const MediaCard = ({
  className = '',
  children,
  isBookmarked = false,
  hoverBookmark = false,
  hoverCard = false,
  isHoverable,
}: MediaCardProps) => {
  return (
    <div data-testid="media-card" className={cn('relative h-full w-full', className)}>
      <MediaCardContextProvider value={{ hoverCard, isBookmarked, hoverBookmark, isHoverable }}>
        {children}
      </MediaCardContextProvider>
    </div>
  );
};
