import { Skeleton } from '@/components/generic/Skeleton';
import { cn } from '@/utils/styles';

export const MediaCarouselCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton
      className={cn(
        'aspect-[1.7143] w-[240px]',
        'sm:aspect-[2.043] sm:w-[470px]',
        'lg:aspect-[2.043] lg:w-[470px]',
        className
      )}
    />
  );
};
