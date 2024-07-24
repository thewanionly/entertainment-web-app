import { ButtonProps, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { BookMarkFull, BookMarkEmpty } from '../Icon';
import { useMediaCard } from './MediaCard.context';

type MediaCardBookmarkButtonProps = {
  className?: string;
};

const bookmarkHoverClassName = {
  default: 'bg-white text-dark-blue',
  hover: 'hover:bg-white hover:text-dark-blue',
};

export const MediaCardBookmarkButton = ({
  className = '',
  ...props
}: MediaCardBookmarkButtonProps & ButtonProps) => {
  const { hoverBookmark, isBookmarked, setShowPlayBtn } = useMediaCard();

  const label = isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks';
  const BookMarkIcon = isBookmarked ? BookMarkFull : BookMarkEmpty;

  return (
    <IconButton
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
      onMouseEnter={() => setShowPlayBtn(false)}
      onMouseLeave={() => setShowPlayBtn(true)}
      {...props}
    >
      <BookMarkIcon className="h-[14px] w-[12px]" />
      <IconButtonSrLabel label={label} />
    </IconButton>
  );
};
