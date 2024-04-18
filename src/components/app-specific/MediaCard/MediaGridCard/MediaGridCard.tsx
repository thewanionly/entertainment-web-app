import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';

type MediaGridCardProps = {
  className?: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  year: string;
  category: 'movie' | 'tv_series';
  rating: string;
};

export const MediaGridCard = ({
  className = '',
  imgSrc,
  imgAlt,
  title,
  year,
  category,
  rating,
}: MediaGridCardProps) => {
  return (
    <MediaCard className={cn('inline-flex flex-col gap-2', className)}>
      <MediaCard.Image className="h-[110px] w-[164px]" src={imgSrc} alt={imgAlt} />
      <MediaCard.Details title={title} year={year} category={category} rating={rating} />
    </MediaCard>
  );
};
