import { Media } from '@/types/medias';

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
  cache: 'no-store',
};

export const fetchTrendingMovies = async (): Promise<Media[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/trending/movie/day`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trending movies data');
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

export const fetchTrendingTv = async (): Promise<Media[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/trending/tv/day`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trending TV data');
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
