import { forwardRef } from 'react';

import { ButtonProps } from '@/components/generic/Button';

import { BookmarkButton } from '../BookmarkButton';
import { useMediaCard } from './MediaCard.context';

type MediaCardBookmarkButtonProps = {
  className?: string;
};

export const MediaCardBookmarkButton = forwardRef<
  HTMLButtonElement,
  MediaCardBookmarkButtonProps & ButtonProps
>((props, ref) => {
  const { hoverBookmark, isBookmarked, setShowPlayBtn } = useMediaCard();

  return (
    <BookmarkButton
      ref={ref}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      onMouseEnter={() => setShowPlayBtn(false)}
      onMouseLeave={() => setShowPlayBtn(true)}
      {...props}
    />
  );
});

MediaCardBookmarkButton.displayName = 'MediaCardBookmarkButton';
