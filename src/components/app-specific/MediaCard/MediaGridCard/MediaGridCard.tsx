import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';
import { Media } from '../MediaCard.types';

type MediaGridCardProps = Media & {
  className?: string;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
};

export const MediaGridCard = ({
  className = '',
  imgSrc,
  imgAlt,
  title,
  year,
  category,
  rating,
  isBookmarked,
  hoverBookmark = false,
  hoverCard = false,
}: MediaGridCardProps) => {
  return (
    <MediaCard
      className={cn('inline-flex flex-col gap-2', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
    >
      <MediaCard.Image src={imgSrc} alt={imgAlt} />
      <MediaCard.Details title={title} year={year} category={category} rating={rating} />
    </MediaCard>
  );
};
