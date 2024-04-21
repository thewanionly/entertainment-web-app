import type { Meta, StoryObj } from '@storybook/react';

import { MediaSliderCard } from './MediaSliderCard';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof MediaSliderCard> = {
  title: 'App Specific Components/MediaSliderCard',
  component: MediaSliderCard,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof MediaSliderCard>;

export const Default: Story = {
  args: {
    imgSrc: '/images/earths-untouched/large.jpg',
    imgAlt: '4 people with their backs turned having fun in a sunset seemingly on a mountain',
    title: `Earth's Untouched`,
  },
};