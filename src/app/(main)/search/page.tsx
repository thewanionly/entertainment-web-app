import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import {
  MediaSectionGrid,
  MediaSectionGridItems,
} from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { redirect } from '@/lib/navigation';
import { fetchSearchResults } from '@/services/medias/fetchSearchResults';

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({
  searchParams: { q: searchTerm = '' },
}: SearchPageProps) {
  if (!searchTerm) {
    redirect('/');
  }

  const { results, totalResults } = await fetchSearchResults(searchTerm);

  return (
    <MediaSection className="my-6 sm:my-[2.125rem]">
      <MediaSectionTitle titleTag="p" className="normal-case">
        {`Found ${totalResults} results for ‘${searchTerm}’`}
      </MediaSectionTitle>
      <MediaSectionGrid>
        <MediaSectionGridItems medias={results} />
      </MediaSectionGrid>
    </MediaSection>
  );
}
