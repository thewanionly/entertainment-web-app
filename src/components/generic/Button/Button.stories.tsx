import NextLink from 'next/link';

import type { Meta, StoryObj } from '@storybook/react';

import { NavBookmark, NavHome, Play } from '@/components/app-specific/Icon';

import { Button } from './Button';
import { IconButton as IconButtonComponent } from './IconButton';

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

export const IconButton: Story = {
  render: () => (
    <IconButtonComponent label="Home Navigation">
      <NavHome />
    </IconButtonComponent>
  ),
};

export const IconAndLabel: Story = {
  render: () => (
    <Button>
      <NavBookmark className="flex h-7 w-6 items-center" viewBox="0 0 28 28" />
      Bookmark
    </Button>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Button asChild variant="outline">
      <NextLink href="/login">Login</NextLink>
    </Button>
  ),
};

export const Custom: Story = {
  render: () => (
    <Button
      variant="secondary"
      className="h-12 rounded-full bg-grey/25 text-lg text-white hover:bg-grey/50"
    >
      <Play className="mr-5 h-7 w-7" viewBox="0 0 30 30" />
      <span className="mr-2">Play</span>
    </Button>
  ),
};
