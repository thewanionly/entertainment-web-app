import { MIN_PAGE, MAX_PAGE } from '@/constants/medias/pagination';
import { MediaResultsInfo } from '@/types/medias';

import {
  MediasApiMediaType,
  MediasApiMovie,
  MediasApiResponse,
  MediasApiTV,
} from './mediasApi.types';
import { transformMediaResults } from './mediasApi.utils';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

export const fetchSearchTvSeriesResults = async (
  searchTerm: string,
  pageParam = MIN_PAGE
): Promise<MediaResultsInfo> => {
  try {
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
      query: searchTerm,
      page: String(pageParam),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/search/tv?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch search TV series results for "${searchTerm}"`);
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

export const fetchSearchMovieResults = async (
  searchTerm: string,
  pageParam = MIN_PAGE
): Promise<MediaResultsInfo> => {
  try {
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
      query: searchTerm,
      page: String(pageParam),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/search/movie?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch search movie results for "${searchTerm}"`);
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

export const fetchSearchResults = async (
  searchTerm: string,
  pageParam = MIN_PAGE
): Promise<MediaResultsInfo> => {
  try {
    const [movies, tv] = await Promise.all([
      fetchSearchMovieResults(searchTerm, pageParam),
      fetchSearchTvSeriesResults(searchTerm, pageParam),
    ]);

    const searchResults: MediaResultsInfo = {
      page: movies.page || tv.page,
      results: [...movies.results, ...tv.results],
      totalPages:
        movies.totalPages !== undefined && tv.totalPages !== undefined
          ? Math.max(movies.totalPages, tv.totalPages)
          : undefined,
      totalResults:
        movies.totalResults !== undefined && tv.totalResults !== undefined
          ? movies.totalResults + tv.totalResults
          : undefined,
    };

    return searchResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
