import { MIN_PAGE, MAX_PAGE } from '@/constants/medias';
import { MediaResultsInfo } from '@/types/medias';

import {
  MediasApiMedia,
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

    // TODO: find better way to assign searchparam to API in GET request: https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
    const queryParams = new URLSearchParams({
      query: searchTerm,
      page: String(pageParam),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/search/multi?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch search results for "${searchTerm}"`);
    }

    // TODO: review comment below and support "person" type by iterating over "known_for" field  (not sure yet if it makes sense to support)
    // TODO: if we do, ensure pagination/totalResults is not broken when filtering out person media type
    // technically "MediasApiMedia" here should include "person" type but since
    // we are filtering it out in the next line and we don't really use
    // "person" type in our application, it doesn't makes sense to include
    // "person" typing in our app
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = (await response.json()) as MediasApiResponse<MediasApiMedia>;

    return {
      page,
      results: transformMediaResults(
        results.filter(({ media_type }) => media_type !== MediasApiMediaType.PERSON)
      ),
      totalPages,
      totalResults,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
