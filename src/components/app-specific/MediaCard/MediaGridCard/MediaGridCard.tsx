import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';
import { Media } from '../MediaCard.types';
import { MediaCardBookmarkButton } from '../MediaCardBookmarkButton';
import { MediaCardDetails } from '../MediaCardDetails';
import { MediaCardHoverableArea } from '../MediaCardHoverableArea';
import { MediaCardImage } from '../MediaCardImage';
import { MediaCardPlayButton } from '../MediaCardPlayButton';

type MediaGridCardProps = Omit<Media, 'isTrending'> & {
  className?: string;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
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
  isHoverable,
}: MediaGridCardProps) => {
  return (
    <MediaCard
      className={cn('inline-flex flex-col gap-2', 'w-[164px] sm:w-[220px] lg:w-[280px]', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardHoverableArea className="aspect-[1.49] sm:aspect-[1.57] lg:aspect-[1.61]">
        <MediaCardImage
          className="col-start-1 row-start-1"
          src={imgSrc}
          alt={imgAlt}
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 44vw"
        />
        <MediaCardBookmarkButton />
        <MediaCardPlayButton />
      </MediaCardHoverableArea>
      <MediaCardDetails title={title} year={year} category={category} rating={rating} />
    </MediaCard>
  );
};
