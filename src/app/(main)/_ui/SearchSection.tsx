'use client';

import { ElementRef, FormEvent, Suspense, useEffect, useRef } from 'react';

import { SearchBar } from '@/components/app-specific/SearchBar';
import { usePathname, useRouter, useSearchParams } from '@/lib/navigation';
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
  const searchInputRef = useRef<ElementRef<'input'>>(null);
  const { topLevelPath } = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchTerm = searchParams.get('q')?.toString();
  const searchPlaceholder = SEARCH_PLACEHOLDER[topLevelPath] ?? SEARCH_PLACEHOLDER.default;

  const handleSearch = (searchValue: string) => {
    const path = topLevelPath || 'search';
    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set('q', searchValue);
    } else {
      params.delete('q');
    }

    replace(`/${path}?${params.toString()}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get(SEARCH_INPUT_NAME) as string;

    handleSearch(inputValue);
  };

  useEffect(() => {
    if (!searchTerm && searchInputRef.current) {
      // clear search input value when there's no searchTerm
      searchInputRef.current.value = '';
    }
  }, [searchTerm]);

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar
        ref={searchInputRef}
        name={SEARCH_INPUT_NAME}
        placeholder={searchPlaceholder}
        defaultValue={searchTerm}
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
