'use client';

import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { MediaType } from '@/types/medias';

export const BookmarkedMoviesGrid = () => {
  const bookmarkedMovies = useBookmarkedMediasStore((state) =>
    state.bookmarkedMedias.filter(({ mediaType }) => mediaType === MediaType.MOVIE)
  );

  return (
    <MediaSectionGrid>
      <MediaSectionGridItems medias={bookmarkedMovies} />
    </MediaSectionGrid>
  );
};
