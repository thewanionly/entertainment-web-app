'use server';

import { fetchSearchResults } from '@/services/medias/fetchSearchResults';

import { MediaPageType, MEDIA_DATA } from '../(main)/[media]/_utils/media.constants';

export const getMediaSearchResults = async (
  searchTerm: string,
  media?: MediaPageType,
  page?: number
) => {
  const searchFetcher = media ? MEDIA_DATA[media].searchFetcher : fetchSearchResults;

  const searchResults = await searchFetcher(searchTerm, page);

  return searchResults;
};
