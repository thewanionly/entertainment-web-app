import { MediaCardType } from '@/types/medias';

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
  cache: 'no-store',
};

const getTrendingTv = async (): Promise<MediasApiTV[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/trending/tv/day`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending TV data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiTV>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.TV,
  }));
};

export const fetchTrendingTv = async (): Promise<MediaCardType[]> => {
  try {
    const tv = await getTrendingTv();

    return transformMediaResults(tv);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTrendingMovies = async (): Promise<MediasApiMovie[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/trending/movie/day`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiMovie>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.MOVIE,
  }));
};

export const fetchTrendingMovies = async (): Promise<MediaCardType[]> => {
  try {
    const movies = await getTrendingMovies();

    return transformMediaResults(movies);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
