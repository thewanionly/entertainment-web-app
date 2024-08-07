import { MediaGridCardSkeleton } from '@/components/app-specific/MediaCard/MediaGridCard/MediaGridCardSkeleton';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionGrid } from '@/components/app-specific/MediaSection/MediaSectionGrid';
import { MediaSectionTitleSkeleton } from '@/components/app-specific/MediaSection/MediaSectionTitleSkeleton';
import { RESULTS_PER_PAGE } from '@/constants/medias/pagination';
import { cn } from '@/utils/styles';

type MediaGridSectionSkeletonProps = {
  titleClassName?: string;
};

export const MediaGridSectionSkeleton = ({ titleClassName }: MediaGridSectionSkeletonProps) => {
  const skeletonCards = Array.from({ length: RESULTS_PER_PAGE }, (_, index) => index);

  return (
    <MediaSection>
      <MediaSectionTitleSkeleton
        className={cn('mb-6 h-6 w-[20%] sm:h-10 lg:mb-8', titleClassName)}
      />
      <MediaSectionGrid>
        {skeletonCards.map((skeletonCard) => (
          <li key={skeletonCard}>
            <MediaGridCardSkeleton />
          </li>
        ))}
      </MediaSectionGrid>
    </MediaSection>
  );
};
