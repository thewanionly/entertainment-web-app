import { MediaCardType, MediaType, MediaVideo } from '@/types/medias';

import {
  MediasApiMedia,
  MediasApiMovie,
  MediasApiTV,
  MediasApiVideo,
} from '../medias/mediasApi.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMovieMedia = (media: any): media is MediasApiMovie => 'title' in media;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTvMedia = (media: any): media is MediasApiTV => 'name' in media;

export const transformMedia = (media: MediasApiMedia) => {
  const transformedResult: MediaCardType = {
    id: media.id,
    title: '',
    releaseDate: '',
    imagePath: media.backdrop_path || media.poster_path || '',
    mediaType: media.media_type as unknown as MediaType,
    overview: media.overview,
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
};

export const transformMediaResults = (results: MediasApiMedia[]): MediaCardType[] =>
  results.map(transformMedia);

export const transformVideo = (videos: MediasApiVideo[]): MediaVideo | null => {
  const officialYoutubeVideos = videos.filter(
    ({ official, site }) => official && site === 'YouTube'
  );
  const trailerVideo = officialYoutubeVideos.find(({ type }) => type === 'Trailer');
  const finalVideo = trailerVideo ?? officialYoutubeVideos[0];

  if (!finalVideo) return null;

  return {
    key: finalVideo.key,
    site: finalVideo.site,
    type: finalVideo.type,
    name: finalVideo.name,
  };
};
