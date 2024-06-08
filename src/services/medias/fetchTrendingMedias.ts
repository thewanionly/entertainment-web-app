import { Media } from '@/types/medias';

import { transformMediaResults } from '../_ui/transformMediaResults';
import { MediasApiMedia, MediasApiMediaType, MediasApiResponse } from './mediasApi.types';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMedias = async (): Promise<Media[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/trending/all/day`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trending medias data');
    }

    // technically "MediasApiMedia" here should include "person" type but since
    // we are filtering it out in the next line and we don't really use
    // "person" type in our application, it doesn't makes sense to include
    // "person" typing in our app
    const data = (await response.json()) as MediasApiResponse<MediasApiMedia>;

    // filter out "person" media type and transform fields to "AppMedia"
    return transformMediaResults(
      data.results.filter(({ media_type }) => media_type !== MediasApiMediaType.PERSON)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
