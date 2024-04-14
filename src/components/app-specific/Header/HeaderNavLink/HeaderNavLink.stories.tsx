import type { Meta, StoryObj } from '@storybook/react';

import { HeaderNavLink } from './HeaderNavLink';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof HeaderNavLink> = {
  title: 'App Specific Components/Header/HeaderNavlink',
  component: HeaderNavLink,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof HeaderNavLink>;

export const Default: Story = {
  args: {
    url: '/',
    label: 'home',
    icon: 'NavHome',
    orientation: 'vertical',
  },
};

export const Hovered: Story = {
  args: {
    url: '/',
    label: 'home',
    icon: 'NavHome',
    orientation: 'vertical',
    className: 'text-red',
  },
};

export const Active: Story = {
  args: {
    url: '/',
    label: 'home',
    icon: 'NavHome',
    active: true,
    orientation: 'vertical',
  },
};
