import { useBookmarkedMediasStore } from '@/stores/bookmarkedMedias';
import { MediaCardType } from '@/types/medias';

type UseBookmarkMediaReturnType = {
  isBookmarked: (id: MediaCardType['id']) => boolean;
  toggleBookmark: (media: MediaCardType) => void;
};

export const useBookmarkMedia = (): UseBookmarkMediaReturnType => {
  const bookmarkedMedias = useBookmarkedMediasStore((state) => state.bookmarkedMedias);
  const addBookmarkedMedia = useBookmarkedMediasStore((state) => state.addBookmarkedMedia);
  const removeBookmarkedMedia = useBookmarkedMediasStore((state) => state.removeBookmarkedMedia);

  const isBookmarked = (id: MediaCardType['id']) =>
    bookmarkedMedias.some((bookmarkedMedia) => bookmarkedMedia.id === id);

  const toggleBookmark = (media: MediaCardType) => {
    if (bookmarkedMedias.find((bookmarkedMedia) => bookmarkedMedia.id === media.id)) {
      removeBookmarkedMedia(media.id);
      return;
    }

    addBookmarkedMedia(media);
  };

  return {
    isBookmarked,
    toggleBookmark,
  };
};
