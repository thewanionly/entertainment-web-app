import { DEFAULT_PAGE } from '@/constants/medias';
import { MediaResultsInfo } from '@/types/medias';

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

export interface FetchTvSeriesParams {
  sortBy?: TvSeriesSortBy;
  page?: number;
}

export const fetchTvSeries = async (params?: FetchTvSeriesParams): Promise<MediaResultsInfo> => {
  try {
    const { sortBy = TvSeriesSortBy.POPULARITY_DESC, page: pageParam = DEFAULT_PAGE } =
      params ?? {};

    const queryParams = new URLSearchParams({
      sort_by: sortBy,
      page: String(pageParam),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/discover/tv?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch TV series data');
    }

    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = (await response.json()) as MediasApiResponse<MediasApiTV>;

    return {
      page,
      results: transformMediaResults(
        results.map((result) => ({
          ...result,
          media_type: MediasApiMediaType.TV,
        }))
      ),
      totalPages,
      totalResults,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
