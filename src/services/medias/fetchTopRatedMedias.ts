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

const getTopRatedTv = async (): Promise<MediasApiTV[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/tv/top_rated`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top rated tv data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiTV>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.TV,
  }));
};

export const fetchTopRatedTv = async (): Promise<MediaCardType[]> => {
  try {
    const tv = await getTopRatedTv();

    return transformMediaResults(tv);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTopRatedMovies = async (): Promise<MediasApiMovie[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/movie/top_rated`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiMovie>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.MOVIE,
  }));
};

export const fetchTopRatedMovies = async (): Promise<MediaCardType[]> => {
  try {
    const movies = await getTopRatedMovies();

    return transformMediaResults(movies);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
