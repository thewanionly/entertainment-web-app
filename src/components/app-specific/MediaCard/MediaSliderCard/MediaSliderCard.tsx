import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';

type MediaSliderCardProps = {
  className?: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
};

export const MediaSliderCard = ({
  className = '',
  imgSrc,
  imgAlt,
  title,
}: MediaSliderCardProps) => {
  return (
    <MediaCard className={cn('relative', className)}>
      <MediaCard.Image className="h-[230px] w-[470px]" src={imgSrc} alt={imgAlt} />
      <MediaCard.Details className="absolute bottom-[16px] left-[16px]" title={title} />
    </MediaCard>
  );
};
