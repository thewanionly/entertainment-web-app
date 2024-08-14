import { useId, MouseEvent } from 'react';

import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { useMediaModalStore } from '@/stores/mediaModal';
import { getYear } from '@/utils/dates';
import { cn } from '@/utils/styles';

import { MediaCard } from '../MediaCard';
import { useFocusCardAfterModalClose } from '../MediaCard.hooks';
import { MediaCardProps } from '../MediaCard.types';
import { MediaCardBookmarkButton } from '../MediaCardBookmarkButton';
import { MediaCardDetails } from '../MediaCardDetails';
import { MediaCardHoverableArea } from '../MediaCardHoverableArea';
import { MediaCardImage } from '../MediaCardImage';

export const MediaCarouselCard = ({
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

  const bookmarkedMedias = useBookmarkedMediasStore((state) => state.bookmarkedMedias);
  const addBookmarkedMedia = useBookmarkedMediasStore((state) => state.addBookmarkedMedia);
  const removeBookmarkedMedia = useBookmarkedMediasStore((state) => state.removeBookmarkedMedia);

  const cardId = useId();
  const { modalTriggerRef } = useFocusCardAfterModalClose(cardId);

  const mediaObj = {
    id: mediaId,
    imagePath: imgSrc,
    title,
    mediaType,
    releaseDate,
    certification: '',
    overview,
  };

  const handleOpenModal = () => {
    setMedia(mediaObj);
    setOpenModal(true);
    setModalTriggerId(cardId);
  };

  const handleBookmarkBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (bookmarkedMedias.find((bookmarkedMedia) => bookmarkedMedia.id === mediaObj.id)) {
      removeBookmarkedMedia(mediaObj.id);
      return;
    }

    addBookmarkedMedia(mediaObj);
  };

  return (
    <MediaCard
      className={cn(
        'aspect-[1.7143] w-[240px]',
        'sm:aspect-[2.043] sm:w-[470px]',
        'lg:aspect-[2.043] lg:w-[470px]',
        className
      )}
      isBookmarked={isBookmarked}
      hoverBookmark={hoverBookmark}
      hoverCard={hoverCard}
      isHoverable={isHoverable}
    >
      <MediaCardHoverableArea className="grid grid-cols-1" title={title} onClick={handleOpenModal}>
        <MediaCardImage
          className="col-start-1 row-start-1"
          src={imgSrc}
          alt={imgAlt}
          sizes="(min-width: 1024px) 36.8vw, (min-width: 768px) 61vw, 64vw"
          priority={prioritizeImg}
          loader={customImgLoader}
        />
        {/* TODO: add back when implementing play trailer functionality */}
        {/* <MediaCardPlayButton
          className={cn(
            '[&.play-button-touch]:mb-[22px]',
            '[&.play-button-touch]:sm:mb-[38px] [&.play-button-touch]:sm:mr-7',
            '[&.play-button-touch]:z-30',
            '[&.play-button-hovered]:-mt-6 [&.play-button-hovered]:sm:mt-0'
          )}
        /> */}
        <MediaCardDetails
          ref={modalTriggerRef}
          className={cn(
            '[&_.upper-details-container]:gap-2 [&_.upper-details-container]:text-[12px] [&_.upper-details-container]:sm:text-body-m',
            '[&_.upper-details-container]:w-[calc(100%_-_1.75rem)] [&_.upper-details-container]:sm:w-[calc(100%_-_2rem)]',
            '[&_.dot-separator]:h-[3px] [&_.dot-separator]:w-[3px]',
            '[&_.mediaType-container]:gap-1.5',
            '[&_.mediaType-icon]:w-3',
            '[&_.title]:text-body-m [&_.title]:font-medium [&_.title]:sm:text-heading-s',
            '[&_.title]:w-[calc(100%_-_1.75rem)] [&_.title]:sm:w-[calc(100%_-_2rem)]',
            '[&_.title_.primary-action:focus-visible]:before:-outline-offset-1',
            'z-20 col-start-1 row-start-1 self-end justify-self-start sm:gap-[3px]',
            'm-0 w-full rounded-b-lg p-4 sm:p-6',
            'bg-gradient-to-b from-black/0 to-black/75'
          )}
          title={title}
          year={getYear(releaseDate)}
          mediaType={mediaType}
          rating={rating}
        />
        <MediaCardBookmarkButton className="sm:mr-6" onClick={handleBookmarkBtnClick} />
      </MediaCardHoverableArea>
    </MediaCard>
  );
};
