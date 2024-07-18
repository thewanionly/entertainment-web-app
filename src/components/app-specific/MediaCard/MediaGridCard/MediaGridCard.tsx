'use client';

import { useEffect, useRef } from 'react';

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
  const openModal = useMediaModalStore((state) => state.openModal);
  const setOpenModal = useMediaModalStore((state) => state.setOpenModal);
  const media = useMediaModalStore((state) => state.media);
  const setMedia = useMediaModalStore((state) => state.setMedia);

  const triggerRef = useRef<HTMLButtonElement>(null);

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
  };

  useEffect(() => {
    if (!openModal && media?.id && mediaId && media?.id === mediaId && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [media, mediaId, openModal]);

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
          ref={triggerRef}
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
