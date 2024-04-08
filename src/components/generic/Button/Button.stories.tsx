import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button variant="default">Default</Button>,
};

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
};

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
};

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
};

export const Link: Story = {
  render: () => <Button variant="link">Link</Button>,
};
