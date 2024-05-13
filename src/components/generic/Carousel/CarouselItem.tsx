import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/utils/styles';

import { useCarousel } from './Carousel.context';

export const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'pl-4' : 'pt-4',
          className
        )}
        data-testid="carousel-item"
        {...props}
      />
    );
  }
);
CarouselItem.displayName = 'CarouselItem';
