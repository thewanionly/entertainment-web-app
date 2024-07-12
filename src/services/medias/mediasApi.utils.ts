import { MediaCardType, MediaType } from '@/types/medias';

import { MediasApiMedia, MediasApiMovie, MediasApiTV } from '../medias/mediasApi.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMovieMedia = (media: any): media is MediasApiMovie => 'title' in media;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTvMedia = (media: any): media is MediasApiTV => 'name' in media;

export const transformMediaResults = (results: MediasApiMedia[]): MediaCardType[] => {
  return results.map((media) => {
    const transformedResult: MediaCardType = {
      id: media.id,
      title: '',
      releaseDate: '',
      imagePath: media.backdrop_path || media.poster_path || '',
      mediaType: media.media_type as unknown as MediaType,
      certification: '', // TODO: determine certification (extra API calls, check with the docs)
    };

    if (isMovieMedia(media)) {
      transformedResult.title = media.title;
      transformedResult.releaseDate = media.release_date;
    }

    if (isTvMedia(media)) {
      transformedResult.title = media.name;
      transformedResult.releaseDate = media.first_air_date;
    }

    return transformedResult;
  });
};
