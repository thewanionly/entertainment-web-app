'use client';

import { FormEvent } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SearchBar } from '@/components/app-specific/SearchBar';
import { cn } from '@/utils/styles';

const SEARCH_INPUT_NAME = 'search';

export const SearchSection = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchTerm = searchParams.get('q')?.toString();

  const handleSearch = (searchValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set('q', searchValue);
    } else {
      params.delete('q');
    }

    replace(`search?${params.toString()}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get(SEARCH_INPUT_NAME) as string;

    if (!inputValue) return;

    handleSearch(inputValue);
  };

  return (
    <section className={cn('mx-auto mt-6 w-[91.467%]', 'lg:mt-16 lg:w-full lg:px-9')}>
      <form onSubmit={handleSubmit}>
        <SearchBar
          name={SEARCH_INPUT_NAME}
          placeholder="Search for movies or TV series"
          defaultValue={searchTerm}
        />
      </form>
    </section>
  );
};
