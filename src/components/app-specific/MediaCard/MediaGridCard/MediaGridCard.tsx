import { cn } from '@/utils/styles';

import {
  MediaCard,
  MediaCardBookMarkIconButton,
  MediaCardDetails,
  MediaCardImageArea,
  MediaCardPlayButton,
} from '../MediaCard';
import { Media } from '../MediaCard.types';

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
      className={cn('inline-flex flex-col gap-2', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardImageArea
        imgProps={{
          src: imgSrc,
          alt: imgAlt,
          sizes: '(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 44vw',
        }}
      >
        <MediaCardBookMarkIconButton
          className={cn(
            'col-start-1 row-start-1 mr-2 mt-2 justify-self-end md:mr-4 md:mt-4',
            'peer z-20'
          )}
        />
        <MediaCardPlayButton />
      </MediaCardImageArea>
      <MediaCardDetails title={title} year={year} category={category} rating={rating} />
    </MediaCard>
  );
};
