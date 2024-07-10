import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Media } from '@/types/medias';

interface MediaModalState {
  mediaId?: string;
  media?: Media;
  setMediaId: (id?: string) => void;
  setMedia: (media?: Media) => void;
}

export const useMediaModalStore = create<MediaModalState>()(
  devtools(
    persist(
      (set) => ({
        setMediaId: (mediaId) => set(() => ({ mediaId })),
        setMedia: (media) => set(() => ({ media })),
      }),
      {
        name: 'media-modal-storage',
      }
    )
  )
);
