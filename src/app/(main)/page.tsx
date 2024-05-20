import { fetchTrendingMedias } from '@/services/medias/fetchTrendingMedias';

import { TrendingSection } from './TrendingSection';

export default async function Home() {
  const trendingMedias = await fetchTrendingMedias();

  return (
    <>
      <TrendingSection className="mt-6 sm:mt-[2.125rem]" medias={trendingMedias} />
    </>
  );
}
