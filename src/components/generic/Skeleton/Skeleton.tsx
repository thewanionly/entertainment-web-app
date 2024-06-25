import { cn } from '@/utils/styles';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('animate-pulse rounded-md bg-grey', className)} {...props} />
);
