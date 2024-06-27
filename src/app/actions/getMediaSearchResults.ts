'use server';

import { fetchSearchResults } from '@/services/medias/fetchSearchResults';

import { MediaPageType, MEDIA_DATA } from '../(main)/(media)/[media]/_utils/media.constants';

type MediaSearchResultsParams = {
  searchTerm: string;
  media?: MediaPageType;
  page?: number;
};

export const getMediaSearchResults = async ({
  searchTerm,
  media,
  page,
}: MediaSearchResultsParams) => {
  const searchFetcher = media ? MEDIA_DATA[media].searchFetcher : fetchSearchResults;

  const searchResults = await searchFetcher(searchTerm, page);

  return searchResults;
};
