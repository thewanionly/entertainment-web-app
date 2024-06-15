import { fetchNowPlayingMovies } from '@/services/medias/fetchNowPlayingMedias';
import { fetchPopularMovies } from '@/services/medias/fetchPopularMedias';
import { fetchTopRatedMovies } from '@/services/medias/fetchTopRatedMedias';
import { fetchTrendingMovies } from '@/services/medias/fetchTrendingMedias';
import { fetchUpcomingMovies } from '@/services/medias/fetchUpcomingMedias';

import { MediaCategoryValue } from './media.types';

export enum MovieCategory {
  TRENDING = 'trending',
  POPULAR = 'popular',
  NOW_PLAYING = 'now-playing',
  UPCOMING = 'upcoming',
  TOP_RATED = 'top-rated',
}

type MovieCategoryValue = MediaCategoryValue<MovieCategory>;

const MOVIE_CATEGORY_ARRAY: Omit<MovieCategoryValue, 'link'>[] = [
  {
    title: 'Trending movies',
    name: MovieCategory.TRENDING,
    promise: fetchTrendingMovies(),
  },
  {
    title: 'Popular movies',
    name: MovieCategory.POPULAR,
    promise: fetchPopularMovies(),
  },
  {
    title: 'Now playing movies',
    name: MovieCategory.NOW_PLAYING,
    promise: fetchNowPlayingMovies(),
  },
  {
    title: 'Upcoming movies',
    name: MovieCategory.UPCOMING,
    promise: fetchUpcomingMovies(),
  },
  {
    title: 'Top rated movies',
    name: MovieCategory.TOP_RATED,
    promise: fetchTopRatedMovies(),
  },
];

// create a MOVIE_CATEGORY object that has a key and link constructed
// from the category name
export const MOVIE_CATEGORY = Object.fromEntries(
  MOVIE_CATEGORY_ARRAY.map((category) => [
    category.name,
    { ...category, link: `/movies/category/${category.name}` },
  ])
) as Record<MovieCategory, MovieCategoryValue>;
