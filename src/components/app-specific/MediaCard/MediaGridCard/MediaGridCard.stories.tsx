import type { Meta, StoryObj } from '@storybook/react';

import { MediaCategory } from '../MediaCard.types';
import { MediaGridCard } from './MediaGridCard';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta = {
  title: 'App Specific Components/MediaGridCard',
  component: MediaGridCard,
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
} satisfies Meta<typeof MediaGridCard>;

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof meta>;

const mockMediaData = {
  imgSrc: '/images/earths-untouched/large.jpg',
  imgAlt: '4 people with their backs turned having fun in a sunset seemingly on a mountain',
  title: `Earth's Untouched`,
  year: '2017',
  category: MediaCategory.Movie,
  rating: '18+',
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
    title: `Earth's Untouched lorem ipsum dolor sit amet lorem ipsum dolor sit amet`,
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

export const TouchDeviceHovered = {
  args: {
    ...mockMediaData,
    isHoverable: false,
  },
  name: 'Play Button - Touch device (persistent)',
} satisfies Story;

export const TouchDeviceHoveredLongTexts = {
  args: {
    ...mockMediaData,
    title: `Earth's Untouched lorem ipsum dolor sit amet lorem ipsum dolor sit amet`,
    rating: 'PGloremipsumdolorsitametloremipsumdolorsitamet',
    isHoverable: false,
  },
  name: 'Play Button - Touch device (persistent) - Long texts',
} satisfies Story;
