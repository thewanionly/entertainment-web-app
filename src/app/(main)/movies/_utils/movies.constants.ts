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
  pageTitle: string;
  name: string;
  link?: string;
  promise: Promise<Media[]>;
}

export const MOVIE_CATEGORY: Record<MovieCategory, MovieCategoryValue> = {
  popular: {
    title: 'Popular',
    pageTitle: 'Popular movies',
    name: 'popular',
    link: '/movies/category/popular',
    promise: fetchPopularMovies(),
  },
  'now-playing': {
    title: 'Now playing',
    pageTitle: 'Now playing movies',
    name: 'now-playing',
    link: '/movies/category/now-playing',
    promise: fetchNowPlayingMovies(),
  },
  upcoming: {
    title: 'Upcoming',
    pageTitle: 'Upcoming movies',
    name: 'upcoming',
    link: '/movies/category/upcoming',
    promise: fetchUpcomingMovies(),
  },
  'top-rated': {
    title: 'Top rated',
    pageTitle: 'Top rated movies',
    name: 'top-rated',
    link: '/movies/category/top-rated',
    promise: fetchTopRatedMovies(),
  },
};
