'use client';

import { Fragment } from 'react';

import { DialogDescription, DialogTitle } from '@/components/generic/Dialog';
import { DrawerDescription, DrawerTitle } from '@/components/generic/Drawer';
import { MEDIA_TYPE_MAP } from '@/constants/medias/mediaType';
import { usePathname } from '@/lib/navigation';
import { useAlertDialogStore } from '@/stores/alertDialog';
import { MediaCardType, MediaType } from '@/types/medias';
import { formatDate } from '@/utils/dates';
import { cn } from '@/utils/styles';

import { BookmarkButton } from '../BookmarkButton';
import { MediaCardDotSeparator } from '../MediaCard/MediaCardDotSeparator';
import { useBookmarkMedia } from '../MediaCard/hooks/useBookmarkMedia';
import { useFocusBookmarkBtnAfterAlertDialogClose } from '../MediaCard/hooks/useFocusBookmarkBtnAfterAlertDialogClose';

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

type MediaModalDetails = {
  data: MediaCardType;
  isMobile: boolean;
};

export const MediaModalDetails = ({ data, isMobile }: MediaModalDetails) => {
  const { id, title, releaseDate, mediaType, certification, overview } = data;

  const MediaModalTitleTag = isMobile ? DrawerTitle : DialogTitle;
  const MediaMoodalDescriptionTag = isMobile ? DrawerDescription : DialogDescription;

  const { topLevelPath } = usePathname();
  const { isBookmarked, toggleBookmark } = useBookmarkMedia();
  const setShowAlertDialog = useAlertDialogStore((state) => state.setShowAlertDialog);
  const setDetails = useAlertDialogStore((state) => state.setDetails);
  const setAction = useAlertDialogStore((state) => state.setAction);
  const setAlertDialogTriggerId = useAlertDialogStore((state) => state.setTriggerId);
  const { bookmarkBtnRef } = useFocusBookmarkBtnAfterAlertDialogClose(String(id));

  const handleToggleBookmark = () => {
    const isItemBookmarked = isBookmarked(id);

    if (isItemBookmarked && topLevelPath === 'bookmarks') {
      if (id) setAlertDialogTriggerId(String(id));

      setShowAlertDialog(true);
      setDetails({
        title: 'Remove this item from your bookmark list?',
        description: `This will remove "${title}" from your bookmark list. To add it back, you would have to find it in the media pages and bookmark it again.`,
      });
      setAction(() => toggleBookmark(data));
      return;
    }

    toggleBookmark(data);
  };

  return (
    <div className="max-h-[80%] overflow-auto p-6 pb-8 sm:p-6 lg:p-8 xs:p-4 xs:pb-6">
      <div className="flex justify-between">
        <div>
          <MediaModalTitleTag className="mb-1 text-heading-s sm:text-heading-l sm:font-medium xs:text-heading-xs">
            {title}
          </MediaModalTitleTag>
          <MediaKeyDetails
            releaseDate={releaseDate}
            mediaType={mediaType}
            certification={certification}
          />
        </div>
        <BookmarkButton
          ref={bookmarkBtnRef}
          className={cn(
            '[&_.bookmark-icon]:sm:h-[18px] [&_.bookmark-icon]:sm:w-[18px]',
            'mt-2 sm:mt-3'
          )}
          onClick={handleToggleBookmark}
          isBookmarked={isBookmarked(id)}
        />
      </div>
      <MediaMoodalDescriptionTag className="mt-8 text-body-m sm:mt-10 sm:text-[1rem] sm:text-body-m">
        {overview}
      </MediaMoodalDescriptionTag>
    </div>
  );
};
