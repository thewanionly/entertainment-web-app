import { ReactNode, forwardRef } from 'react';

import Image, { ImageProps } from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import {
  BookMarkEmpty,
  BookMarkFull,
  CategoryMovie,
  CategoryTV,
  Play,
} from '@/components/app-specific/Icon';
import { Button, ButtonProps, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/styles';

import { MediaCardContextProvider, useMediaCard } from './MediaCard.context';
import { MediaCategory } from './MediaCard.types';

type MediaCardProps = {
  className?: string;
  children: ReactNode;
  isBookmarked?: boolean;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
};

type MediaCardImageAreaProps = {
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

const MEDIA_CATEGORY_MAP = {
  movie: {
    icon: CategoryMovie,
    label: 'Movie',
  },
  tv_series: {
    icon: CategoryTV,
    label: 'TV Series',
  },
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
  isHoverable,
}: MediaCardProps) => {
  return (
    <div data-testid="media-card" className={cn('relative', className)}>
      <MediaCardContextProvider value={{ hoverCard, isBookmarked, hoverBookmark, isHoverable }}>
        {children}
      </MediaCardContextProvider>
    </div>
  );
};

type MediaCardImageProps = ImageProps & {
  className?: string;
  imgClassName?: string;
};

export const MediaCardImage = ({
  className = '',
  imgClassName = '',
  alt,
  ...props
}: MediaCardImageProps) => {
  return (
    <div className={cn('relative h-full w-full', className)}>
      <Image className={cn('rounded-lg object-cover', imgClassName)} alt={alt} fill {...props} />
    </div>
  );
};

const MediaCardImageArea = ({ className = '', src, alt }: MediaCardImageAreaProps) => {
  const {
    hoverCard,
    isHoverable: initialIsHoverable,
    showPlayBtn,
    setShowPlayBtn,
  } = useMediaCard();

  let isHoverable = useMediaQuery('(hover: hover)');

  if (initialIsHoverable !== undefined) {
    isHoverable = initialIsHoverable;
  }

  return (
    <div
      data-testid="media-card-image"
      className={cn(
        'rounded-lg',
        'group relative grid h-[110px] w-[164px]',
        'md:h-[140px] md:w-[220px]',
        'xl:h-[174px] xl:w-[280px]',
        className
      )}
      onMouseEnter={() => setShowPlayBtn(true)}
      onMouseLeave={() => setShowPlayBtn(false)}
    >
      <MediaCardBookMarkIconButton
        className={cn(
          'col-start-1 row-start-1 mr-2 mt-2 justify-self-end md:mr-4 md:mt-4',
          'peer z-20'
        )}
      />

      {/* Play button for non-touch device where hover is possible */}
      <AnimatePresence>
        {showPlayBtn && isHoverable && (
          <MotionMediayPlayButton
            className={cn('col-start-1 row-start-1 place-self-center', 'z-20')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Play button for touch device where hover is NOT possible */}
      {!isHoverable && (
        <IconButton
          className={cn(
            'col-start-1 row-start-1 mb-3.5 ml-3.5 self-end justify-self-start',
            'z-20 h-6 w-6 rounded-full bg-black/25 p-0 text-white shadow-md shadow-black/50',
            'hover:bg-black/60 hover:text-white/80'
          )}
          title="Play"
        >
          <Play className="h-6 w-6" />
          <IconButtonSrLabel label="Play" />
        </IconButton>
      )}

      <MediaCardImage
        className="col-start-1 row-start-1"
        src={src}
        alt={alt}
        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 44vw"
      />

      {isHoverable && (
        <div
          className={cn(
            'col-start-1 row-start-1',
            'z-10',
            'h-full w-full rounded-lg bg-black/50',
            'opacity-0 motion-safe:transition-opacity',
            '[@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:peer-hover:opacity-0',
            hoverCard && 'opacity-100'
          )}
        />
      )}
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
  const { icon: CategoryIcon, label: categoryName } = MEDIA_CATEGORY_MAP[category];

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
          <CategoryIcon className="w-2.5 md:w-3" title={categoryName} />
          {categoryName}
        </span>
        <DotSeparator />
        <span>{rating}</span>
      </div>
      <p className={cn('text-[14px] font-medium text-white', 'md:text-heading-xs')}>{title}</p>
    </div>
  );
};

type MediaCardBookMarkIconProps = {
  className?: string;
};

export const MediaCardBookMarkIconButton = ({
  className = '',
  ...props
}: MediaCardBookMarkIconProps & ButtonProps) => {
  const { hoverBookmark, isBookmarked, setShowPlayBtn } = useMediaCard();

  const label = isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks';
  const BookMarkIcon = isBookmarked ? BookMarkFull : BookMarkEmpty;

  return (
    <IconButton
      id="bookmark-icon-btn"
      className={cn(
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

const MediaPlayButton = forwardRef<HTMLButtonElement, { className?: string }>(
  function MediaPlayButton({ className = '' }, ref) {
    return (
      <Button
        variant="secondary"
        className={cn(
          'h-min gap-[15px] rounded-full p-[7px] text-body-m md:gap-[19px] md:p-[9px] md:text-heading-xs',
          'bg-white/25 text-white hover:bg-white/50 hover:text-dark-blue',
          'motion-safe:transition-colors',
          className
        )}
        ref={ref}
      >
        <Play className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
        <span className="mr-[12px] md:mr-[15px]">Play</span>
      </Button>
    );
  }
);

const MotionMediayPlayButton = motion(MediaPlayButton);

MediaCard.Image = MediaCardImageArea;
MediaCard.Details = MediaCardDetails;
