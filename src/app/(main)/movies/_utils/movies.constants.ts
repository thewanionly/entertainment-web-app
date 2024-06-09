import { fetchNowPlayingMovies } from '@/services/medias/fetchNowPlayingMedias';
import { fetchPopularMovies } from '@/services/medias/fetchPopularMedias';
import { fetchTopRatedMovies } from '@/services/medias/fetchTopRatedMedias';
import { fetchUpcomingMovies } from '@/services/medias/fetchUpcomingMedias';
import { Media } from '@/types/medias';

export enum MovieCategory {
  POPULAR = 'popular',
  NOW_PLAYING = 'now-playing',
  UPCOMING = 'upcoming',
  TOP_RATED = 'top-rated',
}

interface MovieCategoryValue {
  title: string;
  name: string;
  promise: Promise<Media[]>;
}

export const MOVIE_CATEGORY: Record<MovieCategory, MovieCategoryValue> = {
  popular: {
    title: 'Popular',
    name: 'popular',
    promise: fetchPopularMovies(),
  },
  'now-playing': {
    title: 'Now playing',
    name: 'now-playing',
    promise: fetchNowPlayingMovies(),
  },
  upcoming: {
    title: 'Upcoming',
    name: 'upcoming',
    promise: fetchUpcomingMovies(),
  },
  'top-rated': {
    title: 'Top rated',
    name: 'top-rated',
    promise: fetchTopRatedMovies(),
  },
};
