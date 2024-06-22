import { MIN_PAGE, MAX_PAGE } from '@/constants/medias';
import { MediaResultsInfo } from '@/types/medias';

import { MediasApiMediaType, MediasApiMovie, MediasApiResponse } from './mediasApi.types';
import { transformMediaResults } from './mediasApi.utils';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
  cache: 'no-store',
};

enum MoviesSortBy {
  POPULARITY_DESC = 'popularity.desc',
}

export interface FetchMoviesParams {
  sortBy?: MoviesSortBy;
  page?: number;
}

export const fetchMovies = async (params?: FetchMoviesParams): Promise<MediaResultsInfo> => {
  try {
    const { sortBy = MoviesSortBy.POPULARITY_DESC, page: pageParam = MIN_PAGE } = params ?? {};

    // validate pageParam
    if (pageParam < MIN_PAGE || pageParam > MAX_PAGE) {
      console.warn(
        'Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.'
      );
      return {
        page: pageParam,
        results: [],
      };
    }

    const queryParams = new URLSearchParams({
      sort_by: sortBy,
      page: String(pageParam),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/discover/movie?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies data');
    }

    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = (await response.json()) as MediasApiResponse<MediasApiMovie>;

    return {
      page,
      results: transformMediaResults(
        results.map((result) => ({
          ...result,
          media_type: MediasApiMediaType.MOVIE,
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
