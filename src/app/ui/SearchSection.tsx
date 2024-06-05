'use client';

import { ChangeEvent } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SearchBar } from '@/components/app-specific/SearchBar';
import { cn } from '@/utils/styles';

const SEARCH_DEBOUNCE_DELAY = 500;

export const SearchSection = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchTerm = searchParams.get('q')?.toString();

  let timerId: NodeJS.Timeout | null = null;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      const searchValue = event.target.value;

      const params = new URLSearchParams(searchParams);

      if (searchValue) {
        params.set('q', searchValue);
      } else {
        params.delete('q');
      }

      replace(`search?${params.toString()}`);
    }, SEARCH_DEBOUNCE_DELAY);
  };

  return (
    <section className={cn('mx-auto mt-6 w-[91.467%]', 'lg:mt-16 lg:w-full lg:px-9')}>
      <SearchBar
        placeholder="Search for movies or TV series"
        defaultValue={searchTerm}
        onChange={handleSearch}
      />
    </section>
  );
};
