import { fetchNowPlayingTv } from '@/services/medias/fetchNowPlayingMedias';
import { fetchPopularTv } from '@/services/medias/fetchPopularMedias';
import { fetchTopRatedTv } from '@/services/medias/fetchTopRatedMedias';
import { fetchTrendingTv } from '@/services/medias/fetchTrendingMedias';
import { fetchUpcomingTv } from '@/services/medias/fetchUpcomingMedias';

import { MediaCategoryValue } from './media.types';

export enum TvCategory {
  TRENDING = 'trending',
  POPULAR = 'popular',
  AIRING_TODAY = 'airing-today',
  ON_THE_AIR = 'on-the-air',
  TOP_RATED = 'top-rated',
}

type TvCategoryValue = MediaCategoryValue<TvCategory>;

const TV_CATEGORY_ARRAY: Omit<TvCategoryValue, 'link'>[] = [
  {
    title: 'Trending TV series',
    name: TvCategory.TRENDING,
    promise: fetchTrendingTv(),
  },
  {
    title: 'Popular TV series',
    name: TvCategory.POPULAR,
    promise: fetchPopularTv(),
  },
  {
    title: 'Airing Today TV series',
    name: TvCategory.AIRING_TODAY,
    promise: fetchNowPlayingTv(),
  },
  {
    title: 'On the Air TV series',
    name: TvCategory.ON_THE_AIR,
    promise: fetchUpcomingTv(),
  },
  {
    title: 'Top rated TV series',
    name: TvCategory.TOP_RATED,
    promise: fetchTopRatedTv(),
  },
];

// create a TV_CATEGORY object that has a key and link constructed
// from the category name
export const TV_CATEGORY = Object.fromEntries(
  TV_CATEGORY_ARRAY.map((category) => [
    category.name,
    { ...category, link: `/tv/category/${category.name}` },
  ])
) as Record<TvCategory, TvCategoryValue>;
