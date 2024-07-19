'use client';

import { useId } from 'react';

import { useMediaModalStore } from '@/stores/mediaModal';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';
import { useFocusCardAfterModalClose } from '../MediaCard.hooks';
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
  prioritizeImg = false,
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
  const setOpenModal = useMediaModalStore((state) => state.setOpenModal);
  const setMedia = useMediaModalStore((state) => state.setMedia);
  const setModalTriggerId = useMediaModalStore((state) => state.setModalTriggerId);

  const cardId = useId();
  const { modalTriggerRef } = useFocusCardAfterModalClose(cardId);

  const handleOpenModal = () => {
    setMedia({
      id: mediaId,
      imagePath: imgSrc,
      title,
      mediaType,
      releaseDate,
      certification: '',
      overview,
    });
    setOpenModal(true);
    setModalTriggerId(cardId);
  };

  return (
    <MediaCard
      className={cn('w-[164px] sm:w-[220px] lg:w-[280px]', className)}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardHoverableArea
        className="grid grid-cols-1 gap-2"
        title={title}
        onClick={handleOpenModal}
      >
        <MediaCardImage
          className=" col-start-1 row-start-1 aspect-[1.49] sm:aspect-[1.57] lg:aspect-[1.61]"
          src={imgSrc}
          alt={imgAlt}
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 44vw"
          priority={prioritizeImg}
          loader={customImgLoader}
        />
        {/* TODO: add back when implementing bookmark functionality */}
        {/* <MediaCardBookmarkButton /> */}
        {/* TODO: add back when implementing play trailer functionality */}
        {/* <MediaCardPlayButton /> */}

        <MediaCardDetails
          ref={modalTriggerRef}
          className=" col-start-1 row-start-2"
          title={title}
          year={getYear(releaseDate)}
          mediaType={mediaType}
          rating={rating}
        />
      </MediaCardHoverableArea>
    </MediaCard>
  );
};
