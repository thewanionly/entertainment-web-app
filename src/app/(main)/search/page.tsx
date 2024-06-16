import { redirect } from '@/lib/navigation';
import { fetchSearchResults } from '@/services/medias/fetchSearchResults';

import { MediaGridSection } from '../_ui/MediaGridSection';

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
    <MediaGridSection
      className="my-6 sm:my-[2.125rem]"
      title={`Found ${totalResults} results for ‘${searchTerm}’`}
      titleTag="p"
      titleClassName="normal-case"
      medias={results}
    />
  );
}
