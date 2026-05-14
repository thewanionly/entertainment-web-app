'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';

import { SearchBar } from '@/components/app-specific/SearchBar';
import { usePathname, useRouter, useSearchParams } from '@/lib/navigation';
import { MediaCardType, MediaType } from '@/types/medias';
import { cn } from '@/utils/styles';

const SEARCH_INPUT_NAME = 'search';

const SEARCH_PLACEHOLDER: Record<string, string> = {
  default: 'Search for movies or TV series',
  movies: 'Search for movies',
  tv: 'Search for TV series',
  bookmarks: 'Search for bookmarked shows',
};

// Fix for https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout#possible-ways-to-fix-it
const SearchComponent = () => {
  const { topLevelPath } = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchTerm = searchParams.get('q')?.toString();
  const [searchValue, setSearchValue] = useState(searchTerm ?? '');
  const searchPlaceholder = SEARCH_PLACEHOLDER[topLevelPath] ?? SEARCH_PLACEHOLDER.default;
  const autoCompleteMediaType =
    topLevelPath === 'movies' ? MediaType.MOVIE : topLevelPath === 'tv' ? MediaType.TV : undefined;
  const autoCompleteEnabled = topLevelPath !== 'bookmarks';

  const handleSearch = (searchValue: string) => {
    const trimmedSearchValue = searchValue.trim();
    const path = topLevelPath || 'search';
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedSearchValue) {
      params.set('q', trimmedSearchValue);
    } else {
      params.delete('q');
    }

    const search = params.toString();

    replace(search ? `/${path}?${search}` : `/${path}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSearch(searchValue);
  };

  const handleSuggestionSelect = (suggestion: MediaCardType) => {
    setSearchValue(suggestion.title);
    handleSearch(suggestion.title);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    handleSearch('');
  };

  useEffect(() => {
    setSearchValue(searchTerm ?? '');
  }, [searchTerm]);

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar
        name={SEARCH_INPUT_NAME}
        placeholder={searchPlaceholder}
        value={searchValue}
        autoCompleteEnabled={autoCompleteEnabled}
        autoCompleteMediaType={autoCompleteMediaType}
        onChange={(event) => setSearchValue(event.target.value)}
        onClear={handleClearSearch}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </form>
  );
};

export const SearchSection = () => (
  <section
    className={cn(
      'mx-auto my-6 w-[91.467%] sm:my-0 sm:mb-[2.125rem] lg:mt-16 lg:w-full lg:px-9 2xl:pr-0'
    )}
  >
    <Suspense>
      <SearchComponent />
    </Suspense>
  </section>
);
