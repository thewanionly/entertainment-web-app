import Link from 'next/link';

import type { Meta, StoryObj } from '@storybook/react';

import { NavHome } from '@/components/app-specific/Icon';

import { IconButton as IconButtonComponent, IconButtonSrLabel } from './IconButton';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof IconButtonComponent> = {
  title: 'Generic Components/Button',
  component: IconButtonComponent,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof IconButtonComponent>;

export const IconButton: Story = {
  render: (args) => (
    <IconButtonComponent {...args}>
      <NavHome />
      <IconButtonSrLabel label="Home Navigation" />
    </IconButtonComponent>
  ),
};

export const IconLink: Story = {
  render: (args) => (
    <IconButtonComponent asChild {...args}>
      <Link href="/">
        <NavHome />
        <IconButtonSrLabel label="Home Navigation" />
      </Link>
    </IconButtonComponent>
  ),
};
