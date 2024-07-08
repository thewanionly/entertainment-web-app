import { cn } from '@/utils/styles';

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('animate-pulse rounded-lg bg-grey/50', className)} {...props} />
);
