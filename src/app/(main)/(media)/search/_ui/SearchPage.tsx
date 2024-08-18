import { getMediaSearchResults } from '@/app/actions/getMediaSearchResults';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionGrid } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionGridItems } from '@/components/app-specific/MediaSection/MediaSectionGridItems';
import { MediaSectionGridMoreItems } from '@/components/app-specific/MediaSection/MediaSectionGridMoreItems';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';

type SearchPageProps = {
  searchTerm: string;
};

export const SearchPage = async ({ searchTerm }: SearchPageProps) => {
  const loadMoreMediaSearchResults = async (page: number) => {
    'use server';

    return (await getMediaSearchResults({ searchTerm: searchTerm ?? '', page })).results;
  };

  const { results, totalResults, totalPages } = await getMediaSearchResults({ searchTerm });

  return (
    <MediaSection>
      <MediaSectionTitle titleTag="p" className="normal-case">
        {`Found ${totalResults} results for ‘${searchTerm}’`}
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
