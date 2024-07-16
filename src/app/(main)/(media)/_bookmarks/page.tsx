import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionTitle } from '@/components/app-specific/MediaSection/MediaSectionTitle';
import { fetchSearchResults } from '@/services/medias/fetchSearchResults';

type BookmarksPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function BookmarksPage({
  searchParams: { q: searchTerm = '' } = {},
}: BookmarksPageProps) {
  if (searchTerm) {
    // bookmarks search page
    // TODO: Replace with actual bookmarks search results
    const { totalResults } = await fetchSearchResults(searchTerm);

    return (
      <MediaSection>
        <MediaSectionTitle>
          `Found ${totalResults} bookmarked medias results for ‘${searchTerm}’`
        </MediaSectionTitle>
      </MediaSection>
    );
  }

  return (
    <>
      <MediaSection>
        <MediaSectionTitle>Bookmarked Movies</MediaSectionTitle>
      </MediaSection>
      <MediaSection>
        <MediaSectionTitle>Bookmarked TV Series</MediaSectionTitle>
      </MediaSection>
    </>
  );
}
