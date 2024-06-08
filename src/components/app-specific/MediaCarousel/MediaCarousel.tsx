'use client';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard/MediaCarouselCard';
import { Carousel } from '@/components/generic/Carousel';
import { CarouselContent } from '@/components/generic/Carousel/CarouselContent';
import { CarouselItem } from '@/components/generic/Carousel/CarouselItem';
import { Media } from '@/types/medias';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

type MediaCarouselProps = {
  items: Media[];
  slidesToScroll?: number;
};

export const MediaCarousel = ({ items, slidesToScroll }: MediaCarouselProps) => (
  <Carousel
    opts={{
      align: 'start',
      slidesToScroll,
    }}
    className="w-full"
  >
    <CarouselContent className="-ml-4 sm:-ml-10">
      {items.map(({ id, imagePath, title, releaseDate, mediaType }, index) => (
        <CarouselItem
          key={id}
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
            imgSrc={imagePath}
            imgAlt={title}
            prioritizeImg={index === 0}
            title={title}
            year={getYear(releaseDate)}
            mediaType={mediaType}
            // rating={adult ? 'PG' : 'G'} TODO:
            isBookmarked={false}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);
