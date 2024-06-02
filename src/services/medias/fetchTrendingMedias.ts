import { Media, MediaType } from '@/types/medias';

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

    // technically "Media" here should include "person" type but since
    // we are filtering it out in the next line and we don't really use
    // "person" type in our application, it doesn't makes sense to include
    // "person" typing in our app
    const data = (await response.json()) as MediasApiResponse<MediasApiMedia>;

    // filter out "person" media type and transform fields to "AppMedia"
    return data.results
      .filter(({ media_type }) => media_type !== MediasApiMediaType.PERSON)
      .map((item) => ({
        id: item.id,
        imagePath: item.backdrop_path || item.poster_path || '',
        title: item.media_type === MediasApiMediaType.MOVIE ? item.title : item.name,
        mediaType: item.media_type as unknown as MediaType,
        releaseDate:
          item.media_type === MediasApiMediaType.MOVIE ? item.release_date : item.first_air_date,
        certification: '', // TODO: determine certification (extra API calls, check with the docs)
      }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
