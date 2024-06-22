import { fetchMovies } from '@/services/medias/fetchMovies';
import {
  fetchSearchMovieResults,
  fetchSearchTvSeriesResults,
} from '@/services/medias/fetchSearchResults';
import { fetchTvSeries } from '@/services/medias/fetchTvSeries';

import { MOVIE_CATEGORY } from '../../_utils/movies.constants';
import { TV_CATEGORY } from '../../_utils/tv.constants';

export enum MediaPageType {
  MOVIES = 'movies',
  TV = 'tv',
}

interface MediaPageValue {
  title: string;
  name: string;
  mediaFetcher: typeof fetchMovies | typeof fetchTvSeries;
  searchLabel: string;
  searchFetcher: typeof fetchSearchMovieResults | typeof fetchSearchTvSeriesResults;
  categories: typeof MOVIE_CATEGORY | typeof TV_CATEGORY;
}

const MEDIA_DATA_ARRAY: MediaPageValue[] = [
  {
    title: 'Movies',
    name: 'movies',
    mediaFetcher: fetchMovies,
    searchLabel: 'movies',
    searchFetcher: fetchSearchMovieResults,
    categories: MOVIE_CATEGORY,
  },
  {
    title: 'TV Series',
    name: 'tv',
    mediaFetcher: fetchTvSeries,
    searchLabel: 'TV series',
    searchFetcher: fetchSearchTvSeriesResults,
    categories: TV_CATEGORY,
  },
];

// create a MEDIA_DATA object that has a key  constructed from the media name
export const MEDIA_DATA = Object.fromEntries(
  MEDIA_DATA_ARRAY.map((media) => [media.name, media])
) as Record<MediaPageType, MediaPageValue>;
