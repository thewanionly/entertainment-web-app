import { Media } from '@/types/medias';

import { transformMediaResults } from '../_ui/transformMediaResults';
import {
  MediasApiMedia,
  MediasApiMediaType,
  MediasApiMovie,
  MediasApiResponse,
  MediasApiTV,
} from './mediasApi.types';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

const fetchTopRatedMovies = async (): Promise<MediasApiMovie[]> => {
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

const fetchTopRatedTv = async (): Promise<MediasApiTV[]> => {
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

export const fetchTopRatedMedias = async (): Promise<Media[]> => {
  try {
    const [movies, tv] = await Promise.all([fetchTopRatedMovies(), fetchTopRatedTv()]);

    const topRatedMedias = [...movies, ...tv] as MediasApiMedia[];

    // sort both medias by rating (top rated first)
    return transformMediaResults(topRatedMedias.sort((a, b) => b.vote_average - a.vote_average));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
