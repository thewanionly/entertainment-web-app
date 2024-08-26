import { forwardRef } from 'react';

import { ButtonProps, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { BookMarkFull, BookMarkEmpty } from '../Icon';

type BookmarkButtonProps = {
  isBookmarked?: boolean;
  hoverBookmark?: boolean;
  className?: string;
};

const bookmarkHoverClassName = {
  default: 'bg-white text-dark-blue',
  hover: 'hover:bg-white hover:text-dark-blue',
};

export const BookmarkButton = forwardRef<HTMLButtonElement, BookmarkButtonProps & ButtonProps>(
  ({ isBookmarked = false, hoverBookmark = false, className = '', ...props }, ref) => {
    const label = isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks';
    const BookMarkIcon = isBookmarked ? BookMarkFull : BookMarkEmpty;

    return (
      <IconButton
        ref={ref}
        id="bookmark-icon-btn"
        className={cn(
          'bookmark-button',
          'peer z-30 col-start-1 row-start-1 mr-2 mt-2 justify-self-end sm:mr-4 sm:mt-4',
          'h-8 w-8 rounded-full bg-dark-blue/50 p-0 text-white hover:bg-dark-blue/50',
          hoverBookmark && bookmarkHoverClassName.default,
          bookmarkHoverClassName.hover,
          'motion-safe:transition-colors',
          className
        )}
        title={label}
        {...props}
      >
        <BookMarkIcon className="h-[14px] w-[12px]" />
        <IconButtonSrLabel label={label} />
      </IconButton>
    );
  }
);

BookmarkButton.displayName = 'BookmarkButton';
