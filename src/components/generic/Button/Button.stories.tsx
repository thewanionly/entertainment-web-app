import NextLink from 'next/link';

import type { Meta, StoryObj } from '@storybook/react';

import { NavBookmark, Play } from '@/components/app-specific/Icon';

import { Button } from './Button';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Button> = {
  title: 'Generic Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['default', 'secondary', 'outline', 'ghost', 'link'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
  },
  parameters: {
    controls: { exclude: ['asChild'] },
  },
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    children: 'Disabled',
    disabled: true,
  },
};

export const IconAndLabel: Story = {
  render: (args) => (
    <Button {...args}>
      <NavBookmark className="mr-3 h-4 w-4 " />
      Bookmark
    </Button>
  ),
};

export const AsChild: Story = {
  render: (args) => (
    <Button asChild {...args}>
      <NextLink href="/login">Login</NextLink>
    </Button>
  ),
  args: {
    variant: 'outline',
  },
};

export const Custom: Story = {
  render: ({ variant }) => (
    <Button
      variant={variant}
      className={
        'h-min gap-[19px] rounded-full bg-white/25 p-[9px] text-heading-xs text-white hover:bg-white/50 hover:text-dark-blue'
      }
    >
      <Play className="h-[30px] w-[30px]" />
      <span className="mr-[15px]">Play</span>
    </Button>
  ),
  args: {
    variant: 'secondary',
  },
  parameters: {
    controls: { exclude: ['variant', 'asChild'] },
  },
};
