import { fetchTrendingMedias } from '@/services/medias/fetchTrendingMedias';

import { TrendingSection } from './TrendingSection';

export default async function Home() {
  const trendingMedias = await fetchTrendingMedias();

  return (
    <main className="w-screen">
      <TrendingSection className="mt-6" medias={trendingMedias} />
    </main>
  );
}
