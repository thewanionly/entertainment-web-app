import { MovieDetails } from '@/types/movieDetails';

import { MediasApiMediaType, MediasApiMovie } from './mediasApi.types';
import { transformMedia, transformVideo } from './mediasApi.utils';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
  cache: 'no-store',
};

const appendToResponse = ['videos'];

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const queryParams = new URLSearchParams({
      append_to_response: appendToResponse.join(','),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/movie/${movieId}?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details of movie id: ${movieId}`);
    }

    const movieDetails = (await response.json()) as MediasApiMovie;
    const transformedMedia = transformMedia({
      ...movieDetails,
      media_type: MediasApiMediaType.MOVIE,
    });

    return { ...transformedMedia, video: transformVideo(movieDetails.videos.results) ?? undefined };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
