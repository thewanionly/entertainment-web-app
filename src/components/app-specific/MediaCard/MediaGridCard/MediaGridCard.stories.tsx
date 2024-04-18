import type { Meta, StoryObj } from '@storybook/react';

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

export const Default: Story = {
  args: {
    imgSrc: '/images/earths-untouched/small.jpg',
    imgAlt: '4 people with their backs turned having fun in a sunset seemingly on a mountain',
    title: `Earth's Untouched`,
    year: '2017',
    category: 'movie',
    rating: '18+',
  },
};
