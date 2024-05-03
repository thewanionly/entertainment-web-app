import { cn } from '@/utils/styles';

import {
  MediaCard,
  MediaCardBookMarkIconButton,
  MediaCardDetails,
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
  title,
  year,
  category,
  rating,
  isBookmarked,
  hoverBookmark = false,
  hoverCard = false,
  isHoverable,
}: MediaCarouselCardProps) => {
  return (
    <MediaCard
      className={cn(
        'h-[140px] w-[240px]',
        'md:h-[230px] md:w-[470px]',
        'xl:h-[230px] xl:w-[470px]',
        className
      )}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardImageArea
        className={cn('grid grid-cols-1')}
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

        <MediaCardPlayButton
          className={cn(
            '[&.play-button-touch]:mb-[22px] [&.play-button-touch]:mr-3 [&.play-button-touch]:justify-self-end',
            '[&.play-button-touch]:md:mb-[38px] [&.play-button-touch]:md:mr-7',
            '[&.play-button-touch]:z-30',
            '[&.play-button-hovered]:-mt-6 [&.play-button-hovered]:md:mt-0'
          )}
        />

        <MediaCardDetails
          className={cn(
            '[&_.upper-details-container]:gap-2 [&_.upper-details-container]:text-[12px] [&_.upper-details-container]:md:text-body-m',
            '[&_.upper-details-container]:w-[calc(100%_-_1.75rem)] [&_.upper-details-container]:md:w-[calc(100%_-_2rem)]',
            '[&_.dot-separator]:h-[3px] [&_.dot-separator]:w-[3px]',
            '[&_.category-container]:gap-1.5',
            '[&_.category-icon]:w-3',
            '[&_.title]:text-body-m [&_.title]:font-medium [&_.title]:md:text-heading-s',
            '[&_.title]:w-[calc(100%_-_1.75rem)] [&_.title]:md:w-[calc(100%_-_2rem)]',
            'z-20 col-start-1 row-start-1 self-end justify-self-start md:gap-[3px]',
            'm-0 w-full rounded-b-lg p-4 md:p-6',
            'bg-gradient-to-b from-black/0 to-black/75'
          )}
          title={title}
          year={year}
          category={category}
          rating={rating}
        />
      </MediaCardImageArea>
    </MediaCard>
  );
};
