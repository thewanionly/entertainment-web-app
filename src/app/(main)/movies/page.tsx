import { fetchMovies } from '@/services/medias/fetchMovies';
import { fetchSearchMovieResults } from '@/services/medias/fetchSearchResults';

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

  const movies = await fetchMovies();

  return <MediaGridSection className="my-6 sm:my-[2.125rem]" title="Movies" medias={movies} />;
}
