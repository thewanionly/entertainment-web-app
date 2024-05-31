import { TopRatedSection } from '@/app/ui/TopRatedSection';
import { TrendingSection } from '@/app/ui/TrendingSection';
import { fetchTopRatedMedias } from '@/services/medias/fetchTopRatedMedias';
import { fetchTrendingMedias } from '@/services/medias/fetchTrendingMedias';

export default async function Home() {
  const trendingMedias = await fetchTrendingMedias();
  const topRatedMedias = await fetchTopRatedMedias();

  return (
    <>
      <TrendingSection className="mt-6 sm:mt-[2.125rem]" medias={trendingMedias} />
      <TopRatedSection className="my-6 sm:my-[2.4375rem]" medias={topRatedMedias} />
    </>
  );
}
