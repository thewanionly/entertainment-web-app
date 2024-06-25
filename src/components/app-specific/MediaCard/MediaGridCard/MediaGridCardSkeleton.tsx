import { Skeleton } from '@/components/generic/Skeleton';
import { cn } from '@/utils/styles';

export const MediaGridCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-[1.49] w-full sm:aspect-[1.57] sm:w-full lg:aspect-[1.61] lg:w-full" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-[7.5px] sm:gap-2">
          <Skeleton className=" h-3 w-[20%]" />
          <span
            className={cn(
              'dot-separator',
              'h-0.5 w-0.5 flex-shrink-0 rounded-full bg-white/50',
              'sm:h-[3px] sm:w-[3px]'
            )}
          />
          <Skeleton className=" h-3 w-[25%]" />
          <span
            className={cn(
              'dot-separator',
              'h-0.5 w-0.5 flex-shrink-0 rounded-full bg-white/50',
              'sm:h-[3px] sm:w-[3px]'
            )}
          />
          <Skeleton className=" h-3 w-[15%]" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
