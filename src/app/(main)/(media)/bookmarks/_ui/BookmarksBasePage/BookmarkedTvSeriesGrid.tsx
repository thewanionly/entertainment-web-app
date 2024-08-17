'use client';

import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { MediaType } from '@/types/medias';

export const BookmarkedTvSeriesGrid = () => {
  const bookmarkedTvSeries = useBookmarkedMediasStore((state) =>
    state.bookmarkedMedias.filter(({ mediaType }) => mediaType === MediaType.TV)
  );

  return (
    <MediaSectionGrid>
      <MediaSectionGridItems medias={bookmarkedTvSeries} />
    </MediaSectionGrid>
  );
};
