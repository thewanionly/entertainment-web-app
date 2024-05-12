import type { Meta, StoryObj } from '@storybook/react';

import { MediaCarouselCard } from '@/components/app-specific/MediaCard';
import { MediaCategory } from '@/components/app-specific/MediaCard/MediaCard.types';

import { Carousel, CarouselContent, CarouselItem } from './Carousel';
import { CarouselNextButton } from './CarouselNextButton';
import { CarouselPreviousButton } from './CarouselPreviousButton';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Carousel> = {
  title: 'Generic Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[68.27%] md:basis-[64.45%] xl:basis-[39%]">
            <div className="rounded-lg border border-white/75 p-1 text-white/75">
              <div>
                <div className="flex aspect-[2] items-center justify-center p-6">
                  <span className="text-heading-xs font-semibold">{index + 1}</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPreviousButton />
      <CarouselNextButton />
    </Carousel>
  ),
};

const mockMediaData = {
  imgSrc: '/images/beyond-earth/trending/large.jpg',
  imgAlt: 'A man wearing cold jacket standing in a rock with waters and cliff around',
  title: `Beyond Earth`,
  year: '2019',
  category: MediaCategory.Movie,
  rating: 'PG',
  isBookmarked: false,
};

export const MediaCarousel: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[68.27%] md:basis-[64.45%] xl:basis-[39%]">
            <MediaCarouselCard className="w-full md:w-full xl:w-full" {...mockMediaData} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPreviousButton />
      <CarouselNextButton />
    </Carousel>
  ),
};
