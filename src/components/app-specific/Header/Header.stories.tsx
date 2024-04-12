import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Header> = {
  title: 'App Specific Components/Header',
  component: Header,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Header>;

export const Horizontal: Story = {
  args: {},
};
