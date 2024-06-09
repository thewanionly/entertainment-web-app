import { fetchSearchMovieResults } from '@/services/medias/fetchSearchResults';

import { MediaCarouselSection } from '../_ui/MediaCarouselSection';
import { MediaGridSection } from '../_ui/MediaGridSection';
import { MOVIE_CATEGORY, MovieCategory } from './_utils/movies.constants';

type MoviesPageProps = {
  searchParams?: {
    q?: string;
  };
};

const allPromises = Object.values(MOVIE_CATEGORY).map(({ promise }) => promise);
const allCategories = Object.keys(MOVIE_CATEGORY);

const findPromiseIndex = (target: string) =>
  allCategories.findIndex((category) => category === target);

export default async function MoviesPage({
  searchParams: { q: searchTerm = '' } = {},
}: MoviesPageProps) {
  if (searchTerm) {
    const { results, totalResults } = await fetchSearchMovieResults(searchTerm);

    return (
      <MediaGridSection
        className="my-6 sm:my-[2.4375rem]"
        title={`Found ${totalResults} results for ‘${searchTerm}’`}
        titleTag="p"
        medias={results}
      />
    );
  }

  const results = await Promise.all(allPromises);

  const popularMovies = results[findPromiseIndex(MOVIE_CATEGORY[MovieCategory.POPULAR].name)] ?? [];
  const nowPlayingMovies =
    results[findPromiseIndex(MOVIE_CATEGORY[MovieCategory.NOW_PLAYING].name)] ?? [];
  const upcomingMovies =
    results[findPromiseIndex(MOVIE_CATEGORY[MovieCategory.UPCOMING].name)] ?? [];
  const topRatedMovies =
    results[findPromiseIndex(MOVIE_CATEGORY[MovieCategory.TOP_RATED].name)] ?? [];

  return (
    <>
      <MediaCarouselSection
        className="mt-6 sm:mt-[2.125rem]"
        title="Popular Movies"
        medias={popularMovies}
      />
      <MediaCarouselSection
        className="mt-6 sm:mt-[2.125rem]"
        title="Now Playing Movies"
        medias={nowPlayingMovies}
      />
      <MediaCarouselSection
        className="mt-6 sm:mt-[2.125rem]"
        title="Upcoming Movies"
        medias={upcomingMovies}
      />
      <MediaCarouselSection
        className="mt-6 sm:mt-[2.125rem]"
        title="Top Rated Movies"
        medias={topRatedMovies}
      />
    </>
  );
}
