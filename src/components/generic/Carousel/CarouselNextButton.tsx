'use client';

import { forwardRef, ComponentProps } from 'react';

import { ArrowRight } from 'lucide-react';

import { Button, IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

import { useCarousel } from './Carousel.context';

export const CarouselNextButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <IconButton
        ref={ref}
        variant="outline"
        className={cn(
          'absolute h-8 w-8 rounded-full p-1.5',
          orientation === 'horizontal'
            ? '-right-12 top-1/2 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-10 w-14" />
        <IconButtonSrLabel label="Next slide" />
      </IconButton>
    );
  }
);
CarouselNextButton.displayName = 'CarouselNextButton';
