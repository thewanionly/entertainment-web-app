import { ReactNode, forwardRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Play } from '@/components/app-specific/Icon';
import { Button, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { MediaCardContextProvider, useMediaCard } from './MediaCard.context';

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

/** Play button */
const MediaCardPlayButtonHovered = motion(
  forwardRef<HTMLButtonElement, { className?: string }>(function MediaPlayButtonHovered(
    { className = '' },
    ref
  ) {
    return (
      <Button
        variant="secondary"
        className={cn(
          'play-button-hovered',
          'z-20 col-start-1 row-start-1 place-self-center',
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
  })
);

const MediaCardPlayButtonTouch = ({ className }: { className?: string }) => (
  <IconButton
    className={cn(
      'play-button-touch',
      'col-start-1 row-start-1 mb-3.5 ml-3.5 self-end justify-self-start',
      'z-20 h-6 w-6 rounded-full bg-black/25 p-0 text-white shadow-md shadow-black/50',
      'mb-3 mr-3 justify-self-end md:mb-5 md:mr-5',
      'hover:bg-black/60 hover:text-white/80',
      className
    )}
    title="Play"
  >
    <Play className="h-6 w-6" />
    <IconButtonSrLabel label="Play" />
  </IconButton>
);

type MediaCardPlayButtonProps = {
  className?: string;
};

export const MediaCardPlayButton = ({ className }: MediaCardPlayButtonProps) => {
  const { isHoverable, showPlayBtn } = useMediaCard();

  return (
    <>
      {/* Play button for non-touch device where hover is possible */}
      <AnimatePresence>
        {showPlayBtn && isHoverable && (
          <MediaCardPlayButtonHovered
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Play button for touch device where hover is NOT possible */}
      {!isHoverable && <MediaCardPlayButtonTouch className={className} />}
    </>
  );
};
