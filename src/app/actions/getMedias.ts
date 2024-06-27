'use server';

import { MediaPageType, MEDIA_DATA } from '../(main)/(media)/[media]/_utils/media.constants';

type MediasActionParams = {
  media: MediaPageType;
  page?: number;
};

export const getMedias = async ({ media, page }: MediasActionParams) => {
  const { mediaFetcher } = MEDIA_DATA[media] ?? {};

  const movies = await mediaFetcher({ page });

  return movies;
};
