'use client';

import { MediaCarousel } from '@/components/app-specific/MediaCarousel';
import { CarouselOptions } from '@/components/generic/Carousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MediaCardType } from '@/types/medias';

const SLIDES_TO_SCROLL_LG = 2;
const SLIDES_TO_SCROLL_DEFAULT = 1;

type MediaSectionCarouselProps = {
  medias: MediaCardType[];
  options?: CarouselOptions;
  className?: string;
};

export const MediaSectionCarousel = ({ medias, options, className }: MediaSectionCarouselProps) => {
  const lg = useMediaQuery('(min-width: 1024px)');

  const defaultCarouselOptions: CarouselOptions = {
    slidesToScroll: lg ? SLIDES_TO_SCROLL_LG : SLIDES_TO_SCROLL_DEFAULT,
    skipSnaps: true,
  };

  return (
    <MediaCarousel
      className={className}
      items={medias}
      options={{
        ...defaultCarouselOptions,
        ...options,
      }}
    />
  );
};
