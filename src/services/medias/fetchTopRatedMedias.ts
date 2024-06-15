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

export const fetchTopRatedTv = async (): Promise<Media[]> => {
  try {
    const tv = await getTopRatedTv();

    return transformMediaResults(tv);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTopRatedMovies = async (): Promise<Media[]> => {
  try {
    const movies = await getTopRatedMovies();

    return transformMediaResults(movies);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTopRatedMedias = async (): Promise<Media[]> => {
  try {
    const [movies, tv] = await Promise.all([getTopRatedMovies(), getTopRatedTv()]);

    const topRatedMedias = [...movies, ...tv] as MediasApiMedia[];

    // sort both medias by rating (top rated first)
    return transformMediaResults(topRatedMedias.sort((a, b) => b.vote_average - a.vote_average));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
