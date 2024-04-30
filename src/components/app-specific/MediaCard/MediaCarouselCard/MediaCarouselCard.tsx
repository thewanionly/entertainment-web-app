import { cn } from '@/utils/styles';

import {
  MediaCard,
  MediaCardBookMarkIconButton,
  MediaCardImageArea,
  MediaCardPlayButton,
} from '../MediaCard';
import { Media } from '../MediaCard.types';

type MediaCarouselCardProps = Omit<Media, 'isTrending'> & {
  className?: string;
  hoverBookmark?: boolean; // only for storybook
  hoverCard?: boolean; // only for storybook
  isHoverable?: boolean; // only for storybook and testing purposes
};

export const MediaCarouselCard = ({
  className = '',
  imgSrc,
  imgAlt,
  // title,
  isBookmarked,
  hoverBookmark = false,
  hoverCard = false,
  isHoverable,
}: MediaCarouselCardProps) => {
  return (
    <MediaCard
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardImageArea
        className={cn(
          'relative grid',
          'h-[140px] w-[240px]',
          'md:h-[230px] md:w-[470px]',
          'xl:h-[230px] xl:w-[470px]',
          className
        )}
        imgProps={{
          src: imgSrc,
          alt: imgAlt,
          sizes: '(min-width: 1280px) 33vw, (min-width: 768px) 61vw, 64vw',
        }}
      >
        <MediaCardBookMarkIconButton
          className={cn(
            'col-start-1 row-start-1 mr-2 mt-2 justify-self-end md:mr-6 md:mt-4',
            'peer z-20'
          )}
        />

        <MediaCardPlayButton touchClassName="mb-0 mt-3 ml-4 self-start md:ml-6 md:mt-5" />

        {/* <MediaCard.Details className="absolute bottom-[16px] left-[16px]" title={title} /> */}
      </MediaCardImageArea>
    </MediaCard>
  );
};