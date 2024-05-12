'use client';

import { forwardRef, ComponentProps } from 'react';

import { ArrowLeft } from 'lucide-react';

import { Button, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { useCarousel } from './Carousel.context';

export const CarouselPreviousButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <IconButton
        ref={ref}
        variant="outline"
        className={cn(
          'absolute h-8 w-8 rounded-full p-1.5',
          orientation === 'horizontal'
            ? '-left-12 top-1/2 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <IconButtonSrLabel label="Previous slide" />
      </IconButton>
    );
  }
);
CarouselPreviousButton.displayName = 'CarouselPreviousButton';
