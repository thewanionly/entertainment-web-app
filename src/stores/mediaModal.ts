import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MediaModalState {
  mediaId?: string;
  setMediaId: (id: string) => void;
}

export const useMediaModalStore = create<MediaModalState>()(
  devtools(
    persist(
      (set) => ({
        mediaId: '',
        setMediaId: (mediaId) => set(() => ({ mediaId })),
      }),
      {
        name: 'media-modal-storage',
      }
    )
  )
);
