import { Media, MediaType } from '@/types/medias';

import { MediasApiMedia, MediasApiMediaType } from '../medias/mediasApi.types';

export const transformMediaResults = (results: MediasApiMedia[]): Media[] => {
  return results.map(
    ({
      id,
      backdrop_path,
      poster_path,
      media_type,
      title,
      name,
      release_date,
      first_air_date,
    }) => ({
      id,
      imagePath: backdrop_path || poster_path || '',
      title: media_type === MediasApiMediaType.MOVIE ? title : name,
      mediaType: media_type as unknown as MediaType,
      releaseDate: media_type === MediasApiMediaType.MOVIE ? release_date : first_air_date,
      certification: '', // TODO: determine certification (extra API calls, check with the docs)
    })
  );
};
