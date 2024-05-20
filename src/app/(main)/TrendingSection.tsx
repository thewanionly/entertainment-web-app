'use client';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard';
import { MediaCategory } from '@/components/app-specific/MediaCard/MediaCard.types';
import {
  CarouselPreviousButton,
  CarouselNextButton,
  Carousel,
} from '@/components/generic/Carousel';
import { CarouselContent } from '@/components/generic/Carousel/CarouselContent';
import { CarouselItem } from '@/components/generic/Carousel/CarouselItem';
import { IMAGE_BASE_URL } from '@/constants/images';
import { Media } from '@/types/medias';
import { cn } from '@/utils/styles';

type TrendingSectionProps = {
  className?: string;
  medias: Media[];
};

const TrendingCarousel = ({ items }: { items: Media[] }) => (
  <Carousel
    opts={{
      align: 'start',
    }}
    className="w-full"
  >
    <CarouselContent>
      {items.map(({ id, imagePath, title, releaseDate, mediaType }, index) => (
        <CarouselItem key={index} className="basis-[68.27%] md:basis-[64.45%] xl:basis-[39%]">
          <MediaCarouselCard
            key={id}
            className="w-full md:w-full xl:w-full"
            imgSrc={`${IMAGE_BASE_URL}w500${imagePath}`}
            imgAlt={title}
            title={title}
            year={new Date(releaseDate).getFullYear().toString()}
            category={mediaType as MediaCategory}
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

export const TrendingSection = ({ className = '', medias }: TrendingSectionProps) => {
  return (
    <section className={cn('ml-auto w-[95.735%] overflow-hidden', className)}>
      <h2 className="mb-4 text-[1.25rem] font-light">Trending</h2>
      <TrendingCarousel items={medias} />
    </section>
  );
};
