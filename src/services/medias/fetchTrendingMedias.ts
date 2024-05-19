import { Media as AppMedia } from '@/types/medias';

import { Media as APIMedia, MediasEndpointResponse } from './medias.types';

const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMedias = async (): Promise<AppMedia[]> => {
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
    const data = (await response.json()) as MediasEndpointResponse<APIMedia>;

    // filter out "person" media type and transform fields to "AppMedia"
    return data.results
      .filter(({ media_type }) => media_type !== 'person')
      .map((item) => ({
        id: item.id,
        imagePath: item.poster_path,
        title: item.media_type === 'movie' ? item.title : item.name,
        mediaType: item.media_type,
        releaseDate: item.media_type === 'movie' ? item.release_date : item.first_air_date,
        certification: '', // TODO: determine certification (extra API calls, check with the docs)
      }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
