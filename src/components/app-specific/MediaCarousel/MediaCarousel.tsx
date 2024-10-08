'use client';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard/MediaCarouselCard';
import { Carousel, CarouselOptions } from '@/components/generic/Carousel';
import { CarouselContent } from '@/components/generic/Carousel/CarouselContent';
import { CarouselItem } from '@/components/generic/Carousel/CarouselItem';
import { MediaCardType } from '@/types/medias';
import { cn } from '@/utils/styles';

import { useBookmarkMedia } from '../MediaCard/hooks/useBookmarkMedia';

type MediaCarouselProps = {
  items: MediaCardType[];
  options?: CarouselOptions;
  className?: string;
};

export const MediaCarousel = ({ items, options, className }: MediaCarouselProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarkMedia();

  return (
    <Carousel
      opts={{
        align: 'start',
        ...options,
      }}
      className={cn('w-full', className)}
    >
      <CarouselContent className="-ml-4 sm:-ml-10">
        {items.map(({ id, imagePath, title, releaseDate, mediaType, overview }, index) => (
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
              releaseDate={releaseDate}
              mediaType={mediaType}
              // rating={adult ? 'PG' : 'G'} TODO:
              isBookmarked={isBookmarked(id)}
              toggleBookmark={toggleBookmark}
              overview={overview}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
