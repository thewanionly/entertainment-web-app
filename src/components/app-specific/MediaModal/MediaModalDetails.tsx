'use client';

import { Fragment } from 'react';

import { DialogDescription, DialogTitle } from '@/components/generic/Dialog';
import { DrawerDescription, DrawerTitle } from '@/components/generic/Drawer';
import { MEDIA_TYPE_MAP } from '@/constants/medias/mediaType';
import { MediaCardType, MediaType } from '@/types/medias';
import { formatDate } from '@/utils/dates';
import { cn } from '@/utils/styles';

import { MediaCardDotSeparator } from '../MediaCard/MediaCardDotSeparator';

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

type MediaKeyDetailsProps = Pick<
  Partial<MediaCardType>,
  'releaseDate' | 'mediaType' | 'certification'
>;

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

export const MediaModalDetails = ({
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
