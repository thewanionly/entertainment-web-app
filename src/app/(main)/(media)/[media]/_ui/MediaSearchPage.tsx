import { getMediaSearchResults } from '@/app/actions/getMediaSearchResults';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionGrid } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionGridItems } from '@/components/app-specific/MediaSection/MediaSectionGridItems';
import { MediaSectionGridMoreItems } from '@/components/app-specific/MediaSection/MediaSectionGridMoreItems';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';

import { MEDIA_DATA, MediaPageType } from '../_utils/media.constants';

type MediaSearchPageProps = {
  mediaPageType: MediaPageType;
  searchTerm: string;
};

export const MediaSearchPage = async ({ mediaPageType, searchTerm }: MediaSearchPageProps) => {
  const { searchLabel } = MEDIA_DATA[mediaPageType] ?? {};

  const loadMoreMediaSearchResults = async (page: number) => {
    'use server';

    return (await getMediaSearchResults({ searchTerm, media: mediaPageType, page })).results;
  };

  const { results, totalResults, totalPages } = await getMediaSearchResults({
    searchTerm,
    media: mediaPageType,
  });

  return (
    <MediaSection>
      <MediaSectionTitle titleTag="p" className="normal-case">
        {`Found ${totalResults} ${searchLabel} results for ‘${searchTerm}’`}
      </MediaSectionTitle>
      <MediaSectionGrid>
        <MediaSectionGridItems medias={results} />
        <MediaSectionGridMoreItems
          key={searchTerm}
          totalPages={totalPages}
          loadMoreFn={loadMoreMediaSearchResults}
        />
      </MediaSectionGrid>
    </MediaSection>
  );
};
