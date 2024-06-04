import { redirect } from 'next/navigation';

import { MediaGridCard } from '@/components/app-specific/MediaCard/MediaGridCard';
import { fetchSearchResults } from '@/services/medias/fetchSearchResults';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({
  searchParams: { q: searchTerm = '' },
}: SearchPageProps) {
  if (!searchTerm) {
    redirect('/');
  }

  const { results, totalResults } = await fetchSearchResults(searchTerm);

  return (
    <section
      className={cn(
        'mx-auto my-6 w-[91.467%] overflow-hidden sm:my-[2.4375rem]',
        'lg:w-full lg:px-9 2xl:pr-0'
      )}
    >
      <p
        className={cn(
          'mb-4 text-[1.25rem] font-light leading-[normal] tracking-[-0.019375rem]',
          'mb-[1.5625rem] sm:text-heading-l'
        )}
      >
        {`Found ${totalResults} results for ‘${searchTerm}’`}
      </p>
      <ul
        className={cn(
          'w-full',
          'grid grid-cols-2 gap-4',
          'xs:grid-cols-1',
          'sm:grid-cols-3 sm:gap-x-[1.875rem] sm:gap-y-6',
          'lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8'
        )}
      >
        {results?.map(({ id, imagePath, title, releaseDate, mediaType }, index) => (
          <li key={id} data-testid="grid-item">
            <MediaGridCard
              className="w-full sm:w-full lg:w-full"
              imgSrc={imagePath}
              imgAlt={title}
              prioritizeImg={index === 0}
              title={title}
              year={getYear(releaseDate)}
              mediaType={mediaType}
              // rating={adult ? 'PG' : 'G'} TODO:
              isBookmarked={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
