import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { MediaCardType } from '@/types/medias';

interface BookmarkedMediasState {
  bookmarkedMedias: MediaCardType[];
  addBookmarkedMedia: (media: MediaCardType) => void;
  removeBookmarkedMedia: (id: MediaCardType['id']) => void;
}

export const useBookmarkedMediasStore = create<BookmarkedMediasState>()(
  devtools(
    persist(
      (set) => ({
        bookmarkedMedias: [],
        addBookmarkedMedia: (media) =>
          set((state) => ({ bookmarkedMedias: [...state.bookmarkedMedias, media] })),
        removeBookmarkedMedia: (id) =>
          set((state) => ({
            bookmarkedMedias: state.bookmarkedMedias?.filter(
              (bookmarkedMedia) => bookmarkedMedia.id !== id
            ),
          })),
      }),
      { name: 'boookmarkedMediasStore' }
    )
  )
);
