import { getMediaSearchResults } from '@/app/actions/getMediaSearchResults';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionGridMoreItems } from '@/components/app-specific/MediaSection/MediaSectionGridMoreItems';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { redirect } from '@/lib/navigation';

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams: { q = '' } }: SearchPageProps) {
  if (!q) redirect('/');

  const searchTerm = q;

  const loadMoreMediaSearchResults = async (page: number) => {
    'use server';

    return (await getMediaSearchResults({ searchTerm: searchTerm ?? '', page })).results;
  };

  const { results, totalResults, totalPages } = await getMediaSearchResults({ searchTerm });

  return (
    <MediaSection className="my-6 sm:my-[2.125rem]">
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
}
