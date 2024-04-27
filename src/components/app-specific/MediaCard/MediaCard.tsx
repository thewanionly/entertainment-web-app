import { ReactNode, useState, forwardRef } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import {
  BookMarkEmpty,
  BookMarkFull,
  CategoryMovie,
  CategoryTV,
  Play,
} from '@/components/app-specific/Icon';
import { Button, ButtonProps, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { MediaCardContextProvider, useMediaCard } from './MediaCard.context';
import { MediaCategory } from './MediaCard.types';

type MediaCardProps = {
  className?: string;
  children: ReactNode;
  isBookmarked?: boolean;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
};

type MediaCardImageProps = {
  src: string;
  alt: string;
  className?: string;
};

type MediaCardDetailsProps = {
  className?: string;
  title: ReactNode;
  year: string;
  category: MediaCategory;
  rating: string;
};

type MediaCardBookMarkIconProps = {
  className?: string;
  isActive?: boolean;
};

const MEDIA_CATEGORY_ICON = {
  movie: CategoryMovie,
  tv_series: CategoryTV,
};

const bookmarkHoverClassName = {
  default: 'bg-white text-dark-blue',
  hover: 'hover:bg-white hover:text-dark-blue',
};

export const MediaCard = ({
  className = '',
  children,
  isBookmarked = false,
  hoverBookmark = false,
  hoverCard = false,
}: MediaCardProps) => {
  return (
    <div data-testid="media-card" className={cn('relative', className)}>
      <MediaCardContextProvider value={{ hoverCard, isBookmarked, hoverBookmark }}>
        {children}
      </MediaCardContextProvider>
    </div>
  );
};

const MediaCardImage = ({ className = '', src, alt }: MediaCardImageProps) => {
  const { hoverCard, hoverBookmark, isBookmarked } = useMediaCard();
  const [showPlayBtn, setShowPlayBtn] = useState(hoverCard);

  return (
    <div
      data-testid="media-card-image"
      className={cn(
        'rounded-lg',
        'group relative grid h-[110px] w-[164px] ',
        'md:h-[140px] md:w-[220px]',
        'xl:h-[174px] xl:w-[280px]',
        className
      )}
      onMouseEnter={() => setShowPlayBtn(true)}
      onMouseLeave={() => setShowPlayBtn(false)}
    >
      <MediaCardBookMarkIcon
        className={cn(
          'col-start-1 row-start-1 mr-2 mt-2 justify-self-end md:mr-4 md:mt-4',
          'peer z-20',
          hoverBookmark && bookmarkHoverClassName.default
        )}
        isActive={isBookmarked}
        onMouseEnter={() => setShowPlayBtn(false)}
        onMouseLeave={() => setShowPlayBtn(true)}
      />
      <AnimatePresence>
        {showPlayBtn && (
          <MotionMediayPlayButton
            className={cn('col-start-1 row-start-1 place-self-center', 'z-20 ')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <Image
        className="rounded-lg object-cover"
        src={src}
        alt={alt}
        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 48vw"
        fill
      />
      <div
        className={cn(
          'col-start-1 row-start-1',
          'z-10',
          'h-full w-full rounded-lg bg-black/50',
          'opacity-0 group-hover:opacity-100 peer-hover:opacity-0 motion-safe:transition-opacity',
          hoverCard && 'opacity-100'
        )}
      />
    </div>
  );
};

const DotSeparator = () => (
  <span className={cn('h-0.5 w-0.5 rounded-full bg-white/50', 'md:h-[3px] md:w-[3px]')} />
);

const MediaCardDetails = ({
  className = '',
  title,
  year,
  category,
  rating,
}: MediaCardDetailsProps) => {
  const CategoryIcon = MEDIA_CATEGORY_ICON[category];

  return (
    <div className={cn('flex flex-col gap-1 md:gap-[5px]', className)}>
      <div
        className={cn(
          'flex items-center gap-[7.5px] text-[11px] font-light text-white/75',
          'md:gap-2 md:text-body-s'
        )}
      >
        <span>{year}</span>
        <DotSeparator />
        <span className="flex items-center gap-1 capitalize md:gap-1.5">
          <CategoryIcon className="w-2.5 md:w-3" title={category} />
          {category}
        </span>
        <DotSeparator />
        <span>{rating}</span>
      </div>
      <p className={cn('text-[14px] font-medium text-white', 'md:text-heading-xs')}>{title}</p>
    </div>
  );
};

const MediaCardBookMarkIcon = ({
  className = '',
  isActive = false,
  ...props
}: MediaCardBookMarkIconProps & ButtonProps) => {
  const label = isActive ? 'Remove from bookmarks' : 'Add to bookmarks';
  const BookMarkIcon = isActive ? BookMarkFull : BookMarkEmpty;

  return (
    <IconButton
      id="bookmark-icon-btn"
      className={cn(
        'h-8 w-8 rounded-full bg-dark-blue/50 p-0 text-white hover:bg-dark-blue/50',
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
};

const MediaPlayButton = forwardRef<HTMLButtonElement, { className?: string }>(
  function MediaPlayButton({ className = '' }, ref) {
    return (
      <Button
        variant="secondary"
        className={cn(
          'h-min gap-[19px] rounded-full bg-white/25 p-[9px] text-heading-xs text-white hover:bg-white/50 hover:text-dark-blue',
          'motion-safe:transition-colors',
          className
        )}
        ref={ref}
      >
        <Play className="h-[30px] w-[30px]" />
        <span className="mr-[15px]">Play</span>
      </Button>
    );
  }
);

const MotionMediayPlayButton = motion(MediaPlayButton);

MediaCard.Image = MediaCardImage;
MediaCard.Details = MediaCardDetails;
