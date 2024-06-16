import { fetchSearchTvSeriesResults } from '@/services/medias/fetchSearchResults';
import { fetchTvSeries } from '@/services/medias/fetchTvSeries';

import { MediaGridSection } from '../_ui/MediaGridSection';

type TvPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function TvPage({ searchParams: { q: searchTerm = '' } = {} }: TvPageProps) {
  if (searchTerm) {
    // tv search page
    const { results, totalResults } = await fetchSearchTvSeriesResults(searchTerm);

    return (
      <MediaGridSection
        className="my-6 sm:my-[2.125rem]"
        title={`Found ${totalResults} TV series results for ‘${searchTerm}’`}
        titleTag="p"
        titleClassName="normal-case"
        medias={results}
      />
    );
  }

  const tvSeries = await fetchTvSeries();

  return <MediaGridSection className="my-6 sm:my-[2.125rem]" title="TV Series" medias={tvSeries} />;
}
