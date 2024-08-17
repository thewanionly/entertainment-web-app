'use client';

import { MediaGridCardSkeleton } from '@/components/app-specific/MediaCard/MediaGridCard/MediaGridCardSkeleton';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { useIsInClient } from '@/hooks/useIsInClient';
import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { MediaType } from '@/types/medias';

export const BookmarkedTvSeriesGrid = () => {
  const bookmarkedTvSeries = useBookmarkedMediasStore((state) =>
    state.bookmarkedMedias.filter(({ mediaType }) => mediaType === MediaType.TV)
  );
  const isInClient = useIsInClient();
  const skeletonCards = Array.from({ length: 4 }, (_, index) => index);

  if (!isInClient)
    return (
      <MediaSectionGrid>
        {skeletonCards.map((skeletonCard) => (
          <li key={skeletonCard}>
            <MediaGridCardSkeleton />
          </li>
        ))}
      </MediaSectionGrid>
    );

  return (
    <MediaSectionGrid>
      <MediaSectionGridItems medias={bookmarkedTvSeries} />
    </MediaSectionGrid>
  );
};
