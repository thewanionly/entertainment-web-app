import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MediaCardType } from '@/types/medias';

interface MediaModalState {
  openModal: boolean;
  setOpenModal: (openModal?: boolean) => void;
  media?: MediaCardType;
  setMedia: (media?: MediaCardType) => void;
  modalTriggerId?: string;
  setModalTriggerId: (modalTriggerId: string) => void;
}

export const useMediaModalStore = create<MediaModalState>()(
  devtools((set) => ({
    openModal: false,
    setOpenModal: (openModal) => set(() => ({ openModal })),
    setMedia: (media) => set(() => ({ media })),
    setModalTriggerId: (modalTriggerId) => set(() => ({ modalTriggerId })),
  }))
);
