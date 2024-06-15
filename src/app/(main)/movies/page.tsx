import { fetchSearchMovieResults } from '@/services/medias/fetchSearchResults';
import { cn } from '@/utils/styles';

import { MediaGridSection } from '../_ui/MediaGridSection';

type MoviesPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function MoviesPage({
  searchParams: { q: searchTerm = '' } = {},
}: MoviesPageProps) {
  if (searchTerm) {
    // movies search page
    const { results, totalResults } = await fetchSearchMovieResults(searchTerm);

    return (
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title={`Found ${totalResults} movie results for ‘${searchTerm}’`}
        titleTag="p"
        titleClassName="normal-case"
        medias={results}
      />
    );
  }

  return (
    <div className="mx-auto mb-10 mt-4 w-[91.467%] sm:mb-12 sm:mt-5 lg:mb-14 lg:mt-6 lg:w-full lg:px-9 2xl:pr-0">
      <h1 className={cn('inline-block capitalize', 'text-heading-m sm:text-heading-l')}>Movies</h1>
    </div>
  );
}
