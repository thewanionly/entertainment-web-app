import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';

type MediaGridCardProps = {
  className?: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
};

export const MediaGridCard = ({ className = '', imgSrc, imgAlt, title }: MediaGridCardProps) => {
  return (
    <MediaCard className={cn('flex flex-col gap-2', className)}>
      <MediaCard.Image className="h-[110px] w-[164px]" src={imgSrc} alt={imgAlt} />
      <MediaCard.Details title={title} />
    </MediaCard>
  );
};
