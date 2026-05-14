import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from './SearchBar';

/**
 * The default export defines how Storybook lists our stories in the preview
 * Reference: https://storybook.js.org/docs/writing-stories#default-export
 */
const meta: Meta<typeof SearchBar> = {
  title: 'App Specific Components/SearchBar',
  component: SearchBar,
};

export default meta;

/**
 * The named export defines the component's stories
 * Reference: https://storybook.js.org/docs/writing-stories#defining-stories
 */
type Story = StoryObj<typeof SearchBar>;

export const Empty: Story = {
  args: {
    placeholder: 'Search for movies or TV series',
    autoCompleteEnabled: false,
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Search for movies or TV series',
    defaultValue: 'Beyond Earth',
    autoCompleteEnabled: false,
  },
};

export const Active: Story = {
  args: {
    placeholder: 'Search for movies or TV series',
    defaultValue: 'Beyond Earth',
    autoFocus: true,
    autoCompleteEnabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search for movies or TV series',
    defaultValue: 'Beyond Earth',
    disabled: true,
    autoCompleteEnabled: false,
  },
};
