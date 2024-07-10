'use client';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard/MediaCarouselCard';
import { Carousel, CarouselOptions } from '@/components/generic/Carousel';
import { CarouselContent } from '@/components/generic/Carousel/CarouselContent';
import { CarouselItem } from '@/components/generic/Carousel/CarouselItem';
import { Media } from '@/types/medias';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

type MediaCarouselProps = {
  items: Media[];
  options?: CarouselOptions;
  className?: string;
};

export const MediaCarousel = ({ items, options, className }: MediaCarouselProps) => (
  <Carousel
    opts={{
      align: 'start',
      ...options,
    }}
    className={cn('w-full', className)}
  >
    <CarouselContent className="-ml-4 sm:-ml-10">
      {items.map(({ id, imagePath, title, releaseDate, mediaType }, index) => (
        <CarouselItem
          key={`${id}-${index}`}
          className={cn(
            'pl-4 sm:pl-10',
            'xs:basis-[96%]',
            'min-w-[15rem] max-w-[22rem] basis-[68.27%]',
            'sm:max-w-[33rem] sm:basis-[65.788%]',
            'lg:max-w-[31.875rem] lg:basis-[45%]',
            'xl:basis-[42%]'
          )}
        >
          <MediaCarouselCard
            className="w-full sm:w-full lg:w-full"
            mediaId={id}
            imgSrc={imagePath}
            imgAlt={title}
            prioritizeImg={index === 0}
            title={title}
            year={getYear(releaseDate)}
            releaseDate={releaseDate}
            mediaType={mediaType}
            // rating={adult ? 'PG' : 'G'} TODO:
            isBookmarked={false}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);
