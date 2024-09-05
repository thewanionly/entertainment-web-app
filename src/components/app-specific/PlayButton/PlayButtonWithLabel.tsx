import { forwardRef } from 'react';

import { Button, ButtonProps } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { Play } from '../Icon';

type PlayButtonProps = {
  className?: string;
};

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps & ButtonProps>(
  ({ className = '', ...props }, ref) => {
    const label = 'Play';

    return (
      <Button
        variant="secondary"
        className={cn(
          'play-button-w-label',
          'z-20 col-start-1 row-start-1 place-self-center',
          'h-min gap-[15px] rounded-full p-[7px] text-body-m sm:gap-[19px] sm:p-[9px] sm:text-heading-xs',
          'bg-white/25 text-white hover:bg-white/50 hover:text-dark-blue',
          'motion-safe:transition-colors',
          className
        )}
        title={label}
        {...props}
        ref={ref}
      >
        <Play
          className={cn('play-button-w-label-icon', 'h-[25px] w-[25px] sm:h-[30px] sm:w-[30px]')}
        />
        <span className={cn('play-button-w-label-text', 'mr-[12px] sm:mr-[15px]')}>{label}</span>
      </Button>
    );
  }
);

PlayButton.displayName = 'PlayButton';
