import { fetchMovies } from '@/services/medias/fetchMovies';
import { fetchSearchResults } from '@/services/medias/fetchSearchResults';
import { fetchTvSeries } from '@/services/medias/fetchTvSeries';

import { MediaGridSection } from '../_ui/MediaGridSection';

type BookmarksPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function BookmarksPage({
  searchParams: { q: searchTerm = '' } = {},
}: BookmarksPageProps) {
  if (searchTerm) {
    // bookmarks search page
    // TODO: Replace with actual bookmarks search results
    const { results, totalResults } = await fetchSearchResults(searchTerm);

    return (
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title={`Found ${totalResults} bookmarked medias results for ‘${searchTerm}’`}
        titleTag="p"
        titleClassName="normal-case"
        medias={results}
      />
    );
  }

  // TODO: Replace with actual bookmarks data
  const [bookmarkedMovies, bookmarkedTvSeries] = await Promise.all([
    fetchMovies(),
    fetchTvSeries(),
  ]);

  return (
    <>
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title="Bookmarked Movies"
        medias={bookmarkedMovies}
      />
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title="Bookmarked TV Series"
        medias={bookmarkedTvSeries}
      />
    </>
  );
}
