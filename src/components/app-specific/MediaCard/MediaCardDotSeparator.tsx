import { cn } from '@/utils/styles';

export const MediaCardDotSeparator = () => {
  return (
    <span
      className={cn(
        'dot-separator',
        'h-0.5 w-0.5 flex-shrink-0 rounded-full bg-white/50',
        'sm:h-[0.1875rem] sm:w-[0.1875rem]'
      )}
    />
  );
};
