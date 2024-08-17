import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';

import { BookmarkedMoviesGrid } from './BookmarkedMoviesGrid';
import { BookmarkedTvSeriesGrid } from './BookmarkedTvSeriesGrid';

export const BookmarksBasePage = () => {
  return (
    <>
      <MediaSection>
        <MediaSectionTitle>Bookmarked Movies</MediaSectionTitle>
        <BookmarkedMoviesGrid />
      </MediaSection>
      <MediaSection className="mt-6 sm:mt-12 lg:mt-10">
        <MediaSectionTitle>Bookmarked TV Series</MediaSectionTitle>
        <BookmarkedTvSeriesGrid />
      </MediaSection>
    </>
  );
};
