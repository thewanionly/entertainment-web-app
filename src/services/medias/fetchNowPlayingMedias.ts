import { Media } from '@/types/medias';

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

const getNowPlayingMovies = async (): Promise<MediasApiMovie[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/movie/now_playing`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch now playing movies data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiMovie>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.MOVIE,
  }));
};

const getNowPlayingTv = async (): Promise<MediasApiTV[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/tv/airing_today`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch now playing tv data');
  }

  const data = (await response.json()) as MediasApiResponse<MediasApiTV>;

  return data.results.map((item) => ({
    ...item,
    media_type: MediasApiMediaType.TV,
  }));
};

export const fetchNowPlayingTv = async (): Promise<Media[]> => {
  try {
    const tv = await getNowPlayingTv();

    return transformMediaResults(tv);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchNowPlayingMovies = async (): Promise<Media[]> => {
  try {
    const movies = await getNowPlayingMovies();

    return transformMediaResults(movies);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
