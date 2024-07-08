import { MediaCarouselSection } from '../../_ui/MediaCarouselSection';
import { findPromiseIndex, homePagePromises, homePageSectionValues } from './_utils/home.utils';

export default async function HomePage() {
  const results = await Promise.all(homePagePromises);

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      {homePageSectionValues.map(([sectionName, { title }]) => (
        <MediaCarouselSection
          key={sectionName}
          title={title}
          // titleLink={link} TODO: disable link to media category pages for now
          medias={results[findPromiseIndex(sectionName)] ?? []}
        />
      ))}
    </div>
  );
}
