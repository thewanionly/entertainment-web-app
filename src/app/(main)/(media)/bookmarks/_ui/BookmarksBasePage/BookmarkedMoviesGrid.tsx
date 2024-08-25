'use client';

import { MediaGridCardSkeleton } from '@/components/app-specific/MediaCard/MediaGridCard/MediaGridCardSkeleton';
import { MediaSectionGrid } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionGridItems } from '@/components/app-specific/MediaSection/MediaSectionGridItems';
import { useIsInClient } from '@/hooks/useIsInClient';
import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { MediaType } from '@/types/medias';

export const BookmarkedMoviesGrid = () => {
  const bookmarkedMovies = useBookmarkedMediasStore((state) =>
    state.bookmarkedMedias.filter(({ mediaType }) => mediaType === MediaType.MOVIE)
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

  if (bookmarkedMovies.length <= 0) {
    return (
      <p className="text-body-s text-white/75 sm:text-body-m">
        You have no bookmarked movies yet. Click on the bookmark icon on the media cards to bookmark
        a movie.
      </p>
    );
  }

  return (
    <MediaSectionGrid>
      <MediaSectionGridItems medias={bookmarkedMovies} />
    </MediaSectionGrid>
  );
};
