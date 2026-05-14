import type { SVGProps } from 'react';

import { render, screen, userEvent } from '@/tests/utils';
import { MediaType } from '@/types/medias';

import { AutoComplete, AutoCompleteProps } from './AutoComplete';

jest.mock('@/components/app-specific/Icon', () => {
  const MockIcon = (props: { title?: string } & SVGProps<SVGSVGElement>) => <svg {...props} />;

  return {
    MediaTypeMovie: MockIcon,
    MediaTypeTV: MockIcon,
    Search: MockIcon,
  };
});

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
];

const renderAutoComplete = (props?: Partial<AutoCompleteProps>) =>
  render(
    <AutoComplete
      id="autocomplete-test"
      highlightedIndex={-1}
      isFetchingSuggestions={false}
      searchValue="beyond"
      suggestions={suggestions}
      onClose={jest.fn()}
      onHighlightSuggestion={jest.fn()}
      onSelectSuggestion={jest.fn()}
      {...props}
    />
  );

describe('AutoComplete', () => {
  it('displays search suggestions with media metadata', () => {
    renderAutoComplete();

    expect(screen.getByRole('listbox', { name: /search suggestions/i })).toBeInTheDocument();
    expect(screen.getByText('2 suggestions available.')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Beyond Earth')).toBeInTheDocument();
    expect(screen.getByText('Movie')).toBeInTheDocument();
    expect(screen.getByText('2019')).toBeInTheDocument();
    expect(screen.getByText('The Expanse')).toBeInTheDocument();
    expect(screen.getByText('TV Series')).toBeInTheDocument();
  });

  it('calls select handler when a suggestion is clicked', async () => {
    const onSelectSuggestion = jest.fn();
    renderAutoComplete({ onSelectSuggestion });

    await userEvent.click(screen.getByRole('button', { name: /beyond earth/i }));

    expect(onSelectSuggestion).toHaveBeenCalledWith(suggestions[0]);
  });

  it('calls highlight handler when a suggestion is hovered', async () => {
    const onHighlightSuggestion = jest.fn();
    renderAutoComplete({ onHighlightSuggestion });

    await userEvent.hover(screen.getByRole('button', { name: /the expanse/i }));

    expect(onHighlightSuggestion).toHaveBeenCalledWith(1);
  });

  it('displays a loading state', () => {
    renderAutoComplete({ isFetchingSuggestions: true, suggestions: [] });

    expect(screen.getByRole('status', { name: /searching/i })).toBeInTheDocument();
    expect(screen.getByText('Searching suggestions.')).toHaveAttribute('aria-live', 'polite');
  });

  it('displays an empty state', () => {
    renderAutoComplete({ searchValue: 'zzzzzz', suggestions: [] });

    expect(screen.getByText('No matches for "zzzzzz".')).toBeInTheDocument();
    expect(screen.getByText('No autocomplete suggestions for "zzzzzz".')).toHaveAttribute(
      'aria-live',
      'polite'
    );
  });

  it('displays an error state', () => {
    renderAutoComplete({ error: new Error('Request failed'), suggestions: [] });

    expect(screen.getByText('Unable to load suggestions.')).toBeInTheDocument();
    expect(screen.getByText('Autocomplete suggestions failed to load.')).toHaveAttribute(
      'aria-live',
      'polite'
    );
  });

  it('calls close handler from the search action', async () => {
    const onClose = jest.fn();
    renderAutoComplete({ onClose });

    await userEvent.click(screen.getByRole('button', { name: /search "beyond"/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
