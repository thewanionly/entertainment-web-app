import { MediaDetails } from '@/types/mediaDetails';

import { MediasApiMediaType, MediasApiTV } from './mediasApi.types';
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

export const fetchTvDetails = async (tvId: number): Promise<MediaDetails> => {
  try {
    const queryParams = new URLSearchParams({
      append_to_response: appendToResponse.join(','),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/tv/${tvId}?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch TV details of id: ${tvId}`);
    }

    const tvDetails = (await response.json()) as MediasApiTV;
    const transformedMedia = transformMedia({
      ...tvDetails,
      media_type: MediasApiMediaType.TV,
    });

    return { ...transformedMedia, video: transformVideo(tvDetails.videos.results) ?? undefined };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
