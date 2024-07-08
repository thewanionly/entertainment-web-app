import { Skeleton } from '@/components/generic/Skeleton';

import { MediaCardDotSeparator } from '../MediaCardDotSeparator';

export const MediaGridCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-[1.49] w-full sm:aspect-[1.57] sm:w-full lg:aspect-[1.61] lg:w-full" />
      <div className="flex flex-col gap-1 sm:gap-[0.3125rem]">
        <div className="flex items-center gap-[7.5px] sm:gap-2">
          <Skeleton className=" h-3.5 w-[20%] sm:h-4" />
          <MediaCardDotSeparator />
          <Skeleton className=" h-3.5 w-[25%] sm:h-4" />
          <MediaCardDotSeparator />
          <Skeleton className=" h-3.5 w-[15%] sm:h-4" />
        </div>
        <Skeleton className="h-[1.125rem] w-full sm:h-[1.4375rem]" />
      </div>
    </div>
  );
};
