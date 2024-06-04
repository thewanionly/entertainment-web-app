import { MediaResultsInfo, MediaType } from '@/types/medias';

import { MediasApiMedia, MediasApiMediaType, MediasApiResponse } from './mediasApi.types';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

export const fetchSearchResults = async (searchTerm: string): Promise<MediaResultsInfo> => {
  try {
    // TODO: find better way to assign searchparam to API in GET request: https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
    const queryParams = new URLSearchParams({
      query: searchTerm,
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
      results: results
        .filter(({ media_type }) => media_type !== MediasApiMediaType.PERSON)
        .map((item) => ({
          id: item.id,
          imagePath: item.backdrop_path || item.poster_path || '',
          title: item.media_type === MediasApiMediaType.MOVIE ? item.title : item.name,
          mediaType: item.media_type as unknown as MediaType,
          releaseDate:
            item.media_type === MediasApiMediaType.MOVIE ? item.release_date : item.first_air_date,
          certification: '', // TODO: determine certification (extra API calls, check with the docs)
        })),
      totalPages,
      totalResults,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
