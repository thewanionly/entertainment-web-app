import { forwardRef } from 'react';

import { ButtonProps } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { BookmarkButton } from '../BookmarkButton';
import { useMediaCard } from './MediaCard.context';

type MediaCardBookmarkButtonProps = {
  className?: string;
};

export const MediaCardBookmarkButton = forwardRef<
  HTMLButtonElement,
  MediaCardBookmarkButtonProps & ButtonProps
>(({ className, ...props }, ref) => {
  const { hoverBookmark, isBookmarked, setShowPlayBtn } = useMediaCard();

  return (
    <BookmarkButton
      ref={ref}
      className={cn('mr-2 mt-2 sm:mr-4 sm:mt-4', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      onMouseEnter={() => setShowPlayBtn(false)}
      onMouseLeave={() => setShowPlayBtn(true)}
      {...props}
    />
  );
});

MediaCardBookmarkButton.displayName = 'MediaCardBookmarkButton';
