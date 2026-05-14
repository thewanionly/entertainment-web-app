import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MediaType } from '@/types/medias';

import { AutoComplete } from './AutoComplete';

const suggestions = [
  {
    id: 1,
    imagePath: '/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
    title: 'Beyond Earth',
    mediaType: MediaType.MOVIE,
    releaseDate: '2019-04-12',
    certification: '',
    overview: 'A crew searches for a new home among the stars.',
  },
  {
    id: 2,
    imagePath: '/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg',
    title: 'The Expanse',
    mediaType: MediaType.TV,
    releaseDate: '2015-12-14',
    certification: '',
    overview: 'A missing person case grows into a system-wide conspiracy.',
  },
  {
    id: 3,
    imagePath: '',
    title: 'No Poster Result',
    mediaType: MediaType.MOVIE,
    releaseDate: '2024-01-01',
    certification: '',
    overview: '',
  },
];

const meta = {
  title: 'App Specific Components/AutoComplete',
  component: AutoComplete,
  decorators: [
    (Story) => (
      <div className="max-w-xl bg-dark-blue p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'autocomplete-story',
    highlightedIndex: -1,
    isFetchingSuggestions: false,
    isValidating: false,
    searchValue: 'beyond',
    suggestions,
    onHighlightSuggestion: fn(),
    onSearch: fn(),
    onSelectSuggestion: fn(),
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof AutoComplete>;

export const Results: Story = {};

export const Highlighted: Story = {
  args: {
    highlightedIndex: 1,
  },
};

export const Loading: Story = {
  args: {
    isFetchingSuggestions: true,
    suggestions: [],
  },
};

export const Empty: Story = {
  args: {
    searchValue: 'zzzzzz',
    suggestions: [],
  },
};

export const ErrorState: Story = {
  args: {
    error: new Error('Unable to load suggestions.'),
    suggestions: [],
  },
};
