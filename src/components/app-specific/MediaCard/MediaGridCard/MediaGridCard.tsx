import { cn } from '@/utils/styles';

import {
  MediaCard,
  MediaCardBookmarkButton,
  MediaCardImageArea,
  MediaCardPlayButton,
} from '../MediaCard';
import { Media } from '../MediaCard.types';
import { MediaCardDetails } from '../MediaCardDetails';

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
      className={cn('inline-flex flex-col gap-2', 'w-[164px] md:w-[220px] xl:w-[280px]', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardImageArea
        className={cn('h-[110px] md:h-[140px] xl:h-[174px]')}
        imgProps={{
          src: imgSrc,
          alt: imgAlt,
          sizes: '(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 44vw',
        }}
      >
        <MediaCardBookmarkButton />
        <MediaCardPlayButton />
      </MediaCardImageArea>
      <MediaCardDetails title={title} year={year} category={category} rating={rating} />
    </MediaCard>
  );
};
