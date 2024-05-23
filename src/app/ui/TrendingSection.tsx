'use client';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard/MediaCarouselCard';
import {
  CarouselPreviousButton,
  CarouselNextButton,
  Carousel,
} from '@/components/generic/Carousel';
import { CarouselContent } from '@/components/generic/Carousel/CarouselContent';
import { CarouselItem } from '@/components/generic/Carousel/CarouselItem';
import { IMAGE_BASE_URL } from '@/constants/images';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Media } from '@/types/medias';
import { cn } from '@/utils/styles';

type TrendingSectionProps = {
  className?: string;
  medias: Media[];
};

type MediaCarouselProps = {
  items: Media[];
  slidesToScroll?: number;
};

const MediaCarousel = ({ items, slidesToScroll }: MediaCarouselProps) => (
  <Carousel
    opts={{
      align: 'start',
      slidesToScroll,
    }}
    className="w-full"
  >
    <CarouselContent>
      {items.map(({ id, imagePath, title, releaseDate, mediaType }) => (
        <CarouselItem
          key={id}
          className={cn(
            'xs:basis-[96%]',
            'min-w-[15rem] max-w-[22rem] basis-[68.27%]',
            'sm:max-w-[33rem] sm:basis-[64.45%]',
            'lg:max-w-[29.375rem] lg:basis-[45%]',
            'xl:basis-[42%]'
          )}
        >
          <MediaCarouselCard
            key={id}
            className="w-full sm:w-full lg:w-full"
            imgSrc={`${IMAGE_BASE_URL}w500${imagePath}`}
            imgAlt={title}
            title={title}
            year={new Date(releaseDate).getFullYear().toString()}
            category={mediaType}
            // rating={adult ? 'PG' : 'G'} TODO:
            isBookmarked={false}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPreviousButton />
    <CarouselNextButton />
  </Carousel>
);

const SLIDES_TO_SCROLL_LG = 2;
const SLIDES_TO_SCROLL_DEFAULT = 1;

export const TrendingSection = ({ className = '', medias }: TrendingSectionProps) => {
  const lg = useMediaQuery('(min-width: 1024px)');

  return (
    <section className={cn('ml-auto w-[95.735%] overflow-hidden', className)}>
      <h2
        className={cn(
          'mb-4 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'mb-[1.5625rem] sm:text-heading-l'
        )}
      >
        Trending
      </h2>
      <MediaCarousel
        items={medias}
        slidesToScroll={lg ? SLIDES_TO_SCROLL_LG : SLIDES_TO_SCROLL_DEFAULT}
      />
    </section>
  );
};
