import type { Meta, StoryObj } from '@storybook/react';

import { Picture } from './Picture';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Picture> = {
  title: 'Generic Components/Picture',
  component: Picture,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Picture>;

export const Default: Story = {
  args: {
    className: 'aspect-[1.6] w-[280px]',
    alt: 'Different images',
    commonImgProps: {
      style: { objectFit: 'cover' },
    },
    mobileImgProps: {
      src: '/images/earths-untouched/small.jpg',
    },
    tabletImgProps: {
      src: '/images/during-the-hunt/medium.jpg',
    },
    desktopImgProps: {
      src: '/images/the-great-lands/large.jpg',
    },
  },
};
