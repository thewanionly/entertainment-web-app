'use client';

import { MediaCarousel } from '@/components/app-specific/MediaCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Media } from '@/types/medias';
import { cn } from '@/utils/styles';

type MediaCarouselSectionProps = {
  className?: string;
  title: string;
  medias: Media[];
};

const SLIDES_TO_SCROLL_LG = 2;
const SLIDES_TO_SCROLL_DEFAULT = 1;

export const MediaCarouselSection = ({
  className = '',
  title,
  medias,
}: MediaCarouselSectionProps) => {
  const lg = useMediaQuery('(min-width: 1024px)');

  return (
    <section className={cn('ml-auto w-[95.735%] overflow-hidden lg:w-full lg:pl-9', className)}>
      <h2
        className={cn(
          'mb-4 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'mb-[1.5625rem] sm:text-heading-l'
        )}
      >
        {title}
      </h2>
      <MediaCarousel
        items={medias}
        slidesToScroll={lg ? SLIDES_TO_SCROLL_LG : SLIDES_TO_SCROLL_DEFAULT}
      />
    </section>
  );
};
