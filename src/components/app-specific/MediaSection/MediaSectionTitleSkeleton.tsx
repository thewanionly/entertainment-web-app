import { Skeleton } from '@/components/generic/Skeleton';
import { cn } from '@/utils/styles';

export const MediaSectionTitleSkeleton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn('mb-6 h-6 w-[20%] sm:h-10 lg:mb-8', className)} />;
};
