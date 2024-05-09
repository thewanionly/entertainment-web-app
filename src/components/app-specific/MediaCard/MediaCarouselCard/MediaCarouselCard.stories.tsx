import type { Meta, StoryObj } from '@storybook/react';

import { MediaCategory } from '../MediaCard.types';
import { MediaCarouselCard } from './MediaCarouselCard';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta = {
  title: 'App Specific Components/MediaCarouselCard',
  component: MediaCarouselCard,
  argTypes: {
    category: {
      options: ['movie', 'tv_series'],
      control: {
        type: 'inline-radio',
        labels: {
          movie: 'Movie',
          tv_series: 'TV Series',
        },
      },
      defaultValue: 'movie',
    },
  },
  parameters: {
    controls: { exclude: ['className', 'hoverBookmark', 'hoverCard'] },
  },
} satisfies Meta<typeof MediaCarouselCard>;

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof meta>;

const mockMediaData = {
  imgSrc: '/images/beyond-earth/trending/large.jpg',
  imgAlt: 'A man wearing cold jacket standing in a rock with waters and cliff around',
  title: `Beyond Earth`,
  year: '2019',
  category: MediaCategory.Movie,
  rating: 'PG',
  isBookmarked: false,
};

export const Default: Story = {
  args: {
    ...mockMediaData,
  },
};

export const LongTexts = {
  args: {
    ...mockMediaData,
    title: 'Beyond Earth lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    rating: 'PGloremipsumdolorsitametloremipsumdolorsitamet',
  },
} satisfies Story;

export const BookmarkHovered = {
  args: {
    ...mockMediaData,
    hoverBookmark: true,
  },
  name: 'Bookmark - Idle Hovered',
} satisfies Story;

export const BookmarkActive = {
  args: {
    ...mockMediaData,
    isBookmarked: true,
  },
  name: 'Bookmark - Active',
} satisfies Story;

export const BookmarkActiveHovered = {
  args: {
    ...mockMediaData,
    isBookmarked: true,
    hoverBookmark: true,
  },
  name: 'Bookmark - Active Hovered',
} satisfies Story;

export const NonTouchDeviceHovered = {
  args: {
    ...mockMediaData,
    hoverCard: true,
    isHoverable: true,
  },
  name: 'Play Button - Non-touch device (show when hovered)',
} satisfies Story;

export const TouchDevice = {
  args: {
    ...mockMediaData,
    isHoverable: false,
  },
  name: 'Play Button - Touch device (persistent)',
} satisfies Story;

export const TouchDeviceLongTexts = {
  args: {
    ...mockMediaData,
    title: 'Beyond Earth lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
    rating: 'PGloremipsumdolorsitametloremipsumdolorsitamet',
    isHoverable: false,
  },
  name: 'Play Button - Touch device (persistent) - Long texts',
} satisfies Story;
