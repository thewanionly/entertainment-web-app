import { MediaCarouselSectionSkeleton } from '../_ui/MediaCarouselSectionSkeleton';
import { homePageSectionLength } from './_utils/home.utils';

export default function HomePageLoading() {
  const homePageSectionSkeletons = Array.from(
    { length: homePageSectionLength },
    (_, index) => index
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      {homePageSectionSkeletons.map((skeleton) => (
        <MediaCarouselSectionSkeleton key={skeleton} />
      ))}
    </div>
  );
}
