import { Media } from '@/types/medias';

import { MediasApiMediaType, MediasApiResponse, MediasApiTV } from './mediasApi.types';
import { transformMediaResults } from './mediasApi.utils';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
  cache: 'no-store',
};

enum TvSeriesSortBy {
  POPULARITY_DESC = 'popularity.desc',
}

const DEFAULT_PAGE_NUM = 1;

export interface FetchTvSeriesParams {
  sortBy?: TvSeriesSortBy;
  page?: string;
}

export const fetchTvSeries = async (params?: FetchTvSeriesParams): Promise<Media[]> => {
  try {
    const { sortBy = TvSeriesSortBy.POPULARITY_DESC, page = String(DEFAULT_PAGE_NUM) } =
      params ?? {};

    const queryParams = new URLSearchParams({
      sort_by: sortBy,
      page,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/discover/tv?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch TV series data');
    }

    const data = (await response.json()) as MediasApiResponse<MediasApiTV>;

    return transformMediaResults(
      data.results.map((item) => ({
        ...item,
        media_type: MediasApiMediaType.TV,
      }))
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
