import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MediaCardType } from '@/types/medias';

interface MediaModalState {
  media?: MediaCardType;
  setMedia: (media?: MediaCardType) => void;
}

export const useMediaModalStore = create<MediaModalState>()(
  devtools((set) => ({
    setMedia: (media) => set(() => ({ media })),
  }))
);
