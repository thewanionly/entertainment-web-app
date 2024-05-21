import { forwardRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Button, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { useIsInClient } from '@/hooks/useIsInClient';
import { cn } from '@/utils/styles';

import { Play } from '../Icon';
import { useMediaCard } from './MediaCard.context';

/* Play button for non-touch device where hover is possible */
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
          'h-min gap-[15px] rounded-full p-[7px] text-body-m sm:gap-[19px] sm:p-[9px] sm:text-heading-xs',
          'bg-white/25 text-white hover:bg-white/50 hover:text-dark-blue',
          'motion-safe:transition-colors',
          className
        )}
        ref={ref}
      >
        <Play className="h-[25px] w-[25px] sm:h-[30px] sm:w-[30px]" />
        <span className="mr-[12px] sm:mr-[15px]">Play</span>
      </Button>
    );
  })
);

/* Play button for touch device where hover is NOT possible */
const MediaCardPlayButtonTouch = ({ className }: { className?: string }) => (
  <IconButton
    className={cn(
      'play-button-touch',
      'col-start-1 row-start-1 mb-3.5 ml-3.5 self-end justify-self-start',
      'z-20 h-6 w-6 rounded-full bg-black/25 p-0 text-white shadow-md shadow-black/50',
      'mb-3 mr-3 justify-self-end sm:mb-5 sm:mr-5',
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
  const isInClient = useIsInClient();

  if (!isInClient) return null;

  return isHoverable ? (
    <AnimatePresence>
      {showPlayBtn && (
        <MediaCardPlayButtonHovered
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  ) : (
    <MediaCardPlayButtonTouch className={className} />
  );
};
