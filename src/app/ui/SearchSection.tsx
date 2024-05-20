import { SearchBar } from '@/components/app-specific/SearchBar';
import { cn } from '@/utils/styles';

export const SearchSection = () => {
  return (
    <section className={cn('mx-auto mt-6 w-[91.467%]', 'lg:mt-16 lg:w-full lg:px-9')}>
      <SearchBar placeholder="Search for movies or TV series" />
    </section>
  );
};
