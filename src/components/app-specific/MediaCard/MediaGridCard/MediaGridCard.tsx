'use client';

import { useMediaModalStore } from '@/stores/mediaModal';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';
import { MediaCardProps } from '../MediaCard.types';
import { MediaCardDetails } from '../MediaCardDetails';
import { MediaCardHoverableArea } from '../MediaCardHoverableArea';
import { MediaCardImage } from '../MediaCardImage';

export const MediaGridCard = ({
  className = '',
  mediaId,
  imgSrc,
  imgAlt,
  customImgLoader,
  title,
  releaseDate,
  mediaType,
  rating,
  overview,
  isBookmarked,
  hoverBookmark = false,
  hoverCard = false,
  isHoverable,
}: MediaCardProps) => {
  const setMedia = useMediaModalStore((state) => state.setMedia);

  const openModal = () => {
    setMedia({
      id: mediaId,
      imagePath: imgSrc,
      title,
      mediaType,
      releaseDate,
      certification: '',
      overview,
    });
  };

  return (
    <MediaCard
      className={cn('inline-flex flex-col gap-2', 'w-[164px] sm:w-[220px] lg:w-[280px]', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardHoverableArea
        className="aspect-[1.49] sm:aspect-[1.57] lg:aspect-[1.61]"
        title={title}
        onClick={openModal}
      >
        <MediaCardImage
          className="col-start-1 row-start-1"
          src={imgSrc}
          alt={imgAlt}
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 44vw"
          loader={customImgLoader}
        />
        {/* TODO: add back when implementing bookmark functionality */}
        {/* <MediaCardBookmarkButton /> */}
        {/* TODO: add back when implementing play trailer functionality */}
        {/* <MediaCardPlayButton /> */}
      </MediaCardHoverableArea>
      <MediaCardDetails
        title={title}
        year={getYear(releaseDate)}
        mediaType={mediaType}
        rating={rating}
      />
    </MediaCard>
  );
};
