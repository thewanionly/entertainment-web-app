import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Media } from '@/types/medias';

interface MediaModalState {
  media?: Media;

  setMedia: (media?: Media) => void;
}

export const useMediaModalStore = create<MediaModalState>()(
  devtools((set) => ({
    setMedia: (media) => set(() => ({ media })),
  }))
);
