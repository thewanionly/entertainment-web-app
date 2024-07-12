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

const getUpcomingTv = async (): Promise<MediasApiTV[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/tv/on_the_air`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming tv data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiTV>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.TV,
  }));
};

export const fetchUpcomingTv = async (): Promise<MediaCardType[]> => {
  try {
    const tv = await getUpcomingTv();

    return transformMediaResults(tv);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUpcomingMovies = async (): Promise<MediasApiMovie[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/movie/upcoming`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiMovie>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.MOVIE,
  }));
};

export const fetchUpcomingMovies = async (): Promise<MediaCardType[]> => {
  try {
    const movies = await getUpcomingMovies();

    return transformMediaResults(movies);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
