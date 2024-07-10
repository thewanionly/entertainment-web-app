import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Media } from '@/types/medias';

interface MediaModalState {
  media?: Media;

  setMedia: (media?: Media) => void;
}

export const useMediaModalStore = create<MediaModalState>()(
  devtools(
    persist(
      (set) => ({
        setMedia: (media) => set(() => ({ media })),
      }),
      {
        name: 'media-modal-storage',
      }
    )
  )
);
