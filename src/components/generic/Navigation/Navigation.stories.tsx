import Link from 'next/link';

import type { Meta, StoryObj } from '@storybook/react';

import { BookMarkEmpty, Search, Play } from '@/components/app-specific/Icon';

import { Navigation } from './Navigation';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof Navigation> = {
  title: 'Generic Components/Navigation',
  component: Navigation,
  parameters: {
    controls: { exclude: ['children', 'className'] },
  },
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof Navigation>;

export const TextLinks: Story = {
  render: (args) => (
    <Navigation className="text-white" {...args}>
      <Navigation.Item key="test-1">
        <Link href="/test-1" className="hover:underline">
          Text 1
        </Link>
      </Navigation.Item>
      <Navigation.Item key="test-2">
        <Link href="/test-2" className="hover:underline">
          Text 2
        </Link>
      </Navigation.Item>
      <Navigation.Item key="test-3">
        <Link href="/test-3" className="hover:underline">
          Text 3
        </Link>
      </Navigation.Item>
    </Navigation>
  ),
  args: {},
};

export const IconLinks: Story = {
  render: (args) => (
    <Navigation className="text-white" {...args}>
      <Navigation.Item key="test-1">
        <Link href="/test-1" className="hover:text-greyish-blue">
          <BookMarkEmpty className="h-6 w-6" />
        </Link>
      </Navigation.Item>
      <Navigation.Item key="test-2">
        <Link href="/test-2" className="hover:text-greyish-blue">
          <Search className="h-6 w-6" />
        </Link>
      </Navigation.Item>
      <Navigation.Item key="test-3">
        <Link href="/test-3" className="hover:text-greyish-blue">
          <Play className="h-6 w-6" />
        </Link>
      </Navigation.Item>
    </Navigation>
  ),
  args: {},
};
