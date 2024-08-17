'use client';

import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { isFuzzyMatch } from '@/utils/fuzzySearch';

type BookmarksSearchPageProps = {
  searchTerm: string;
};

export const BookmarksSearchPage = ({ searchTerm }: BookmarksSearchPageProps) => {
  const bookmarksSearchResults = useBookmarkedMediasStore((state) =>
    state.bookmarkedMedias.filter(({ title }) => isFuzzyMatch(title, searchTerm))
  );

  const totalResults = bookmarksSearchResults.length;

  return (
    <MediaSection>
      <MediaSectionTitle titleTag="p" className="normal-case">
        {`Found ${totalResults} bookmarked shows results for ‘${searchTerm}’`}
      </MediaSectionTitle>
      <MediaSectionGrid>
        <MediaSectionGridItems medias={bookmarksSearchResults} />
      </MediaSectionGrid>
    </MediaSection>
  );
};
