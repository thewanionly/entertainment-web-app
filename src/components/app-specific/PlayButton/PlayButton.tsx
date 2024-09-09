import { forwardRef } from 'react';

import { CircleStop } from 'lucide-react';

import { ButtonProps, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { Play } from '../Icon';

type PlayButtonProps = {
  className?: string;
  isPlaying: boolean;
  playLabel?: string;
  stopLabel?: string;
};

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps & ButtonProps>(
  (
    { className = '', isPlaying = false, playLabel = 'Play', stopLabel = 'Stop', ...props },
    ref
  ) => {
    const label = isPlaying ? stopLabel : playLabel;
    const Icon = isPlaying ? CircleStop : Play;

    return (
      <IconButton
        className={cn(
          'play-button',
          'z-20 h-6 w-6 rounded-full bg-black/25 p-0 text-white shadow-md shadow-black/50',
          'hover:bg-black/60 hover:text-white/80',
          'motion-safe:transition-colors',
          className
        )}
        title={label}
        {...props}
        ref={ref}
      >
        <Icon className={cn('play-button-icon', 'h-6 w-6')} />
        <IconButtonSrLabel label={label} />
      </IconButton>
    );
  }
);

PlayButton.displayName = 'PlayButton';
