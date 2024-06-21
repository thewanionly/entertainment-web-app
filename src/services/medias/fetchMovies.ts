import { Media } from '@/types/medias';

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

const DEFAULT_PAGE_NUM = 1;

export interface FetchMoviesParams {
  sortBy?: MoviesSortBy;
  page?: string;
}

export const fetchMovies = async (params?: FetchMoviesParams): Promise<Media[]> => {
  try {
    const { sortBy = MoviesSortBy.POPULARITY_DESC, page = String(DEFAULT_PAGE_NUM) } = params ?? {};

    const queryParams = new URLSearchParams({
      sort_by: sortBy,
      page,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/discover/movie?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies data');
    }

    const data = (await response.json()) as MediasApiResponse<MediasApiMovie>;

    return transformMediaResults(
      data.results.map((item) => ({
        ...item,
        media_type: MediasApiMediaType.MOVIE,
      }))
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
