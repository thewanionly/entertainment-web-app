'use client';

import { usePathname } from '@/lib/navigation';
import { useAlertDialogStore } from '@/stores/alertDialog';
import { MediaCardType } from '@/types/medias';

import { MediaGridCard } from '../MediaCard/MediaGridCard';
import { useBookmarkMedia } from '../MediaCard/hooks/useBookmarkMedia';

const NUM_OF_PRIORITY_IMAGES = 4;

type MediaSectionGridItemsProps = {
  medias: MediaCardType[];
};

export const MediaSectionGridItems = ({ medias }: MediaSectionGridItemsProps) => {
  const { topLevelPath } = usePathname();
  const { isBookmarked, toggleBookmark } = useBookmarkMedia();

  const setShowAlertDialog = useAlertDialogStore((state) => state.setShowAlertDialog);
  const setDetails = useAlertDialogStore((state) => state.setDetails);
  const setAction = useAlertDialogStore((state) => state.setAction);
  const setAlertDialogTriggerId = useAlertDialogStore((state) => state.setTriggerId);

  const handleToggleBookmark = (media: MediaCardType, mediaCardId?: string) => {
    const isItemBookmarked = isBookmarked(media.id);

    if (isItemBookmarked && topLevelPath === 'bookmarks') {
      if (mediaCardId) setAlertDialogTriggerId(mediaCardId);

      setShowAlertDialog(true);
      setDetails({
        title: 'Remove this item from your bookmark list?',
        description: `This will remove "${media.title}" from your bookmark list. To add it back, you would have to find it in the media pages and bookmark it again.`,
      });
      setAction(() => toggleBookmark(media));
      return;
    }

    toggleBookmark(media);
  };

  return (
    <>
      {medias.map(({ id, imagePath, title, releaseDate, mediaType, overview }, index) => (
        <li key={`${id}-${index}`} data-testid="grid-item">
          <MediaGridCard
            className="w-full sm:w-full lg:w-full"
            mediaId={id}
            imgSrc={imagePath}
            imgAlt={title}
            prioritizeImg={index < NUM_OF_PRIORITY_IMAGES}
            title={title}
            releaseDate={releaseDate}
            mediaType={mediaType}
            // rating={adult ? 'PG' : 'G'} TODO:
            overview={overview}
            isBookmarked={isBookmarked(id)}
            toggleBookmark={handleToggleBookmark}
          />
        </li>
      ))}
    </>
  );
};
