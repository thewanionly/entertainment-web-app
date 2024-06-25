'use server';

import { MediaPageType, MEDIA_DATA } from '../(main)/[media]/_utils/media.constants';

export const getMedias = async (media: MediaPageType, page?: number) => {
  const { mediaFetcher } = MEDIA_DATA[media] ?? {};

  const movies = await mediaFetcher({ page });

  return movies;
};
