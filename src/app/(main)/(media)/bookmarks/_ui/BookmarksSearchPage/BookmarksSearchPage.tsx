'use client';

import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { useIsInClient } from '@/hooks/useIsInClient';
import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { isFuzzyMatch } from '@/utils/fuzzySearch';

import { MediaGridSectionSkeleton } from '../../../_ui/MediaGridSectionSkeleton';

type BookmarksSearchPageProps = {
  searchTerm: string;
};

export const BookmarksSearchPage = ({ searchTerm }: BookmarksSearchPageProps) => {
  const bookmarksSearchResults = useBookmarkedMediasStore((state) =>
    state.bookmarkedMedias.filter(({ title }) => isFuzzyMatch(title, searchTerm))
  );
  const isInClient = useIsInClient();

  if (!isInClient) return <MediaGridSectionSkeleton titleClassName="w-[50%] xs:w-[80%]" />;

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
