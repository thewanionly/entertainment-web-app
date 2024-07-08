import { MediaCarouselCardSkeleton } from '@/components/app-specific/MediaCard/MediaCarouselCard/MediaCarouselCardSkeleton';
import { MediaSection } from '@/components/app-specific/MediaSection/MediaSection';
import { MediaSectionTitleSkeleton } from '@/components/app-specific/MediaSection/MediaSectionTitleSkeleton';
import { cn } from '@/utils/styles';

type MediaCarouselSectionSkeletonProps = {
  className?: string;
  titleClassName?: string;
};

export const MediaCarouselSectionSkeleton = ({
  className,
  titleClassName,
}: MediaCarouselSectionSkeletonProps) => {
  const skeletonCardsLength = 3;
  const skeletonCards = Array.from({ length: skeletonCardsLength }, (_, index) => index);

  return (
    <MediaSection className={cn('ml-auto mr-0 w-[95.735%] lg:px-0 lg:pl-9', className)}>
      <MediaSectionTitleSkeleton
        className={cn(
          'mb-4 h-[1.5625rem] w-[45%] min-w-[8.75rem] max-w-[12.5rem] sm:mb-[1.5625rem] sm:h-10 sm:max-w-[17.5rem] xs:w-[60%]',
          titleClassName
        )}
      />
      <ul className="-ml-4 flex sm:-ml-10">
        {skeletonCards.map((skeletonCard) => (
          <li
            key={skeletonCard}
            className={cn(
              'shrink-0 grow-0 pl-4 sm:pl-10',
              'xs:basis-[96%]',
              'min-w-[15rem] max-w-[22rem] basis-[68.27%]',
              'sm:max-w-[33rem] sm:basis-[65.788%]',
              'lg:max-w-[31.875rem] lg:basis-[45%]',
              'xl:basis-[42%]'
            )}
          >
            <MediaCarouselCardSkeleton className="w-full sm:w-full lg:w-full" />
          </li>
        ))}
      </ul>
    </MediaSection>
  );
};
