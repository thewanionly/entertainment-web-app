'use client';

import { Fragment } from 'react';

import { X } from 'lucide-react';

import { IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from '@/components/generic/Dialog';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/generic/Drawer';
import { MEDIA_TYPE_MAP } from '@/constants/medias/mediaType';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMediaModalStore } from '@/stores/mediaModal';
import { MediaCardType, MediaType } from '@/types/medias';
import { formatDate } from '@/utils/dates';
import { cn } from '@/utils/styles';

import { MediaCardDotSeparator } from '../MediaCard/MediaCardDotSeparator';
import { MediaCardImage } from '../MediaCard/MediaCardImage';

type MediaKeyDetailsProps = Pick<
  Partial<MediaCardType>,
  'releaseDate' | 'mediaType' | 'certification'
>;

const renderMediaType = (mediaType: MediaType) => {
  const { icon: MediaTypeIcon, label: mediaTypeLabel } = MEDIA_TYPE_MAP[mediaType];

  return (
    <span key={1} className={cn('flex items-center gap-1 capitalize sm:gap-1.5')}>
      <MediaTypeIcon
        className={cn(
          'h-3.5 w-3.5 sm:h-[1.125rem] sm:w-[1.125rem] xs:w-3',
          mediaType === MediaType.TV && '-mt-1'
        )}
        title={mediaTypeLabel}
      />
      {mediaTypeLabel}
    </span>
  );
};

const MediaKeyDetails = ({ releaseDate, mediaType, certification }: MediaKeyDetailsProps) => {
  const keyDetailsElements = [
    releaseDate && <span key={0}>{formatDate(releaseDate)}</span>,
    mediaType && renderMediaType(mediaType),
    certification && <span key={2}>{certification}</span>,
  ];

  return (
    <div
      className={cn(
        'flex items-center gap-[7.5px] font-light leading-[normal] text-white/75 xs:text-body-s',
        'gap-2 text-body-m sm:gap-3 sm:text-heading-xs sm:font-light'
      )}
    >
      {keyDetailsElements
        .filter((moreDetailsEl) => moreDetailsEl)
        .map((moreDetailsEl, index, elements) => (
          <Fragment key={(moreDetailsEl as JSX.Element).key}>
            {moreDetailsEl}
            {index < elements.length - 1 && <MediaCardDotSeparator />}
          </Fragment>
        ))}
    </div>
  );
};

const MediaModalCloseButton = ({ closeModal }: { closeModal: () => void }) => (
  <IconButton
    className={cn(
      'absolute right-2 top-2 z-50 sm:right-4 sm:top-4',
      'h-8 w-8 rounded-full bg-dark-blue/70 p-1 text-white ring-offset-white hover:bg-dark-blue/70 hover:text-red motion-safe:transition-all sm:h-10 sm:w-10',
      'disabled:pointer-events-none',
      'focus-visible:ring-white-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=open]:bg-dark-blue data-[state=open]:text-white/80'
    )}
    onClick={closeModal}
  >
    <X className="h-5 w-5 sm:h-6 sm:w-6" />
    <IconButtonSrLabel label="Next slide" />
  </IconButton>
);

const MediaModalImage = ({ imagePath, title }: { imagePath: string; title: string }) => (
  <MediaCardImage
    className={cn(
      'aspect-[2] h-[unset] w-full',
      'rounded-b-none rounded-t-md',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-[25%] after:w-full after:bg-gradient-to-b after:from-dark-blue/0 after:to-dark-blue/100'
    )}
    src={imagePath}
    alt={title}
  />
);

const MediaModalDetails = ({
  data,
  isMobile,
}: {
  data: Partial<MediaCardType>;
  isMobile: boolean;
}) => {
  const { title, releaseDate, mediaType, certification, overview } = data ?? {};

  const MediaModalTitleTag = isMobile ? DrawerTitle : DialogTitle;
  const MediaMoodalDescriptionTag = isMobile ? DrawerDescription : DialogDescription;

  return (
    <div className="max-h-[80%] overflow-auto p-6 pb-8 sm:p-6 lg:p-8 xs:p-4 xs:pb-6">
      <MediaModalTitleTag className="mb-1 text-heading-s sm:text-heading-l sm:font-medium xs:text-heading-xs">
        {title}
      </MediaModalTitleTag>
      <MediaKeyDetails
        releaseDate={releaseDate}
        mediaType={mediaType}
        certification={certification}
      />
      <MediaMoodalDescriptionTag className="mt-8 text-body-m sm:mt-10 sm:text-[1rem] sm:text-body-m">
        {overview}
      </MediaMoodalDescriptionTag>
    </div>
  );
};

export const MediaModal = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const media = useMediaModalStore((state) => state.media);
  const openModal = useMediaModalStore((state) => state.openModal);
  const setOpenModal = useMediaModalStore((state) => state.setOpenModal);

  const { title = '', imagePath = '' } = media ?? {};

  const closeModal = () => {
    setOpenModal(false);
  };

  if (!sm) {
    // show drower in mobile
    return (
      <Drawer open={openModal} onOpenChange={(open: boolean) => !open && closeModal()}>
        <DrawerContent>
          <DrawerClose asChild>
            <MediaModalCloseButton closeModal={closeModal} />
          </DrawerClose>
          <MediaModalImage imagePath={imagePath} title={title} />
          <MediaModalDetails data={media as MediaCardType} isMobile={Boolean(sm)} />
        </DrawerContent>
      </Drawer>
    );
  }

  // show dialog in desktop
  return (
    <Dialog open={openModal} onOpenChange={(open: boolean) => !open && closeModal()}>
      <DialogContent
        className={cn(
          'bottom-0 top-[unset] mt-5 flex aspect-[0.9] h-[min-content] max-h-dvh max-w-[unset] translate-y-0 flex-col gap-0 rounded-t-md p-0 sm:top-[50%] sm:w-[90%] sm:max-w-[50rem] sm:translate-y-[-50%] sm:rounded-md'
        )}
      >
        <DialogClose asChild>
          <MediaModalCloseButton closeModal={closeModal} />
        </DialogClose>
        <MediaModalImage imagePath={imagePath} title={title} />
        <MediaModalDetails data={media as MediaCardType} isMobile={Boolean(sm)} />
      </DialogContent>
    </Dialog>
  );
};
