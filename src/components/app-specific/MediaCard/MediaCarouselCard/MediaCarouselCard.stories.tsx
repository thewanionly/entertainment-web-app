import type { Meta, StoryObj } from '@storybook/react';

import { MediaCarouselCard } from './MediaCarouselCard';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof MediaCarouselCard> = {
  title: 'App Specific Components/MediaCarouselCard',
  component: MediaCarouselCard,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof MediaCarouselCard>;

export const Default: Story = {
  args: {
    imgSrc: '/images/beyond-earth/trending/large.jpg',
    imgAlt: 'A man wearing cold jacket standing in a rock with waters and cliff around',
    title: `Beyond Earth`,
  },
};
