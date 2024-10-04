import { Suspense } from 'react';

import { MediaCarouselSectionSkeleton } from '../_ui/MediaCarouselSectionSkeleton';
import { MediaCarouselSectionWrapper } from './_ui/MediaCarouselSectionWrapper';
import { homePageSectionValues } from './_utils/home.utils';

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      {homePageSectionValues.map(([sectionName, { title, promise }]) => (
        <Suspense key={sectionName} fallback={<MediaCarouselSectionSkeleton />}>
          <MediaCarouselSectionWrapper title={title} fetcher={promise} />
        </Suspense>
      ))}
    </div>
  );
}
