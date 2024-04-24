import type { Meta, StoryObj } from '@storybook/react';

import { Media, MediaCategory } from '../MediaCard.types';
import { MediaGridCard } from './MediaGridCard';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof MediaGridCard> = {
  title: 'App Specific Components/MediaGridCard',
  component: MediaGridCard,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof MediaGridCard>;

const mockMediaData: Media = {
  imgSrc: '/images/earths-untouched/large.jpg',
  imgAlt: '4 people with their backs turned having fun in a sunset seemingly on a mountain',
  title: `Earth's Untouched`,
  year: '2017',
  category: MediaCategory.Movie,
  rating: '18+',
  isBookmarked: false,
  isTrending: false,
};

export const Default: Story = {
  args: {
    ...mockMediaData,
  },
};

export const HoveredCard: Story = {
  args: {
    ...mockMediaData,
    hoverCard: true,
  },
  name: 'Hovered (with Play button)',
};

export const BookmarkHovered: Story = {
  args: {
    ...mockMediaData,
    hoverBookmark: true,
  },
  name: 'Bookmark - Idle Hovered',
};

export const BookmarkActive: Story = {
  args: {
    ...mockMediaData,
    isBookmarked: true,
  },
  name: 'Bookmark - Active',
};

export const BookmarkActiveHovered: Story = {
  args: {
    ...mockMediaData,
    isBookmarked: true,
    hoverBookmark: true,
  },
  name: 'Bookmark - Active Hovered',
};
