import { fetchNowPlayingMovies } from '@/services/medias/fetchNowPlayingMedias';
import { fetchPopularMovies } from '@/services/medias/fetchPopularMedias';
import { fetchTopRatedMovies } from '@/services/medias/fetchTopRatedMedias';
import { fetchUpcomingMovies } from '@/services/medias/fetchUpcomingMedias';

import { MediaCarouselSection } from '../_ui/MediaCarouselSection';

const moviesPromises = {
  popular: {
    name: 'popular',
    promise: fetchPopularMovies(),
  },
  nowPlaying: {
    name: 'nowPlaying',
    promise: fetchNowPlayingMovies(),
  },
  upcoming: {
    name: 'upcoming',
    promise: fetchUpcomingMovies(),
  },
  topRated: {
    name: 'topRated',
    promise: fetchTopRatedMovies(),
  },
};

const allPromises = Object.values(moviesPromises).map(({ promise }) => promise);
const allKeys = Object.keys(moviesPromises);

const findPromiseIndex = (target: string) => allKeys.findIndex((key) => key === target);

export default async function MoviesPage() {
  const results = await Promise.all(allPromises);

  const popularMovies = results[findPromiseIndex(moviesPromises.popular.name)] ?? [];
  const nowPlayingMovies = results[findPromiseIndex(moviesPromises.nowPlaying.name)] ?? [];
  const upcomingMovies = results[findPromiseIndex(moviesPromises.upcoming.name)] ?? [];
  const topRatedMovies = results[findPromiseIndex(moviesPromises.topRated.name)] ?? [];

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
