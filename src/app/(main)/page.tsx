import { fetchTopRatedMedias } from '@/services/medias/fetchTopRatedMedias';
import { fetchTrendingMedias } from '@/services/medias/fetchTrendingMedias';

import { MediaCarouselSection } from './_ui/MediaCarouselSection';
import { MediaGridSection } from './_ui/MediaGridSection';

export default async function Home() {
  const trendingMedias = await fetchTrendingMedias();
  const topRatedMedias = await fetchTopRatedMedias();

  return (
    <>
      <MediaCarouselSection
        className="mt-6 sm:mt-[2.125rem]"
        title="Trending"
        medias={trendingMedias}
      />
      <MediaGridSection
        className="my-6 sm:my-[2.4375rem]"
        title="Top Rated"
        medias={topRatedMedias}
      />
    </>
  );
}
