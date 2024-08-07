'use client';

import { Dialog, DialogContent, DialogClose } from '@/components/generic/Dialog';
import { Drawer, DrawerContent, DrawerClose } from '@/components/generic/Drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMediaModalStore } from '@/stores/mediaModal';
import { MediaCardType } from '@/types/medias';
import { cn } from '@/utils/styles';

import { MediaModalCloseButton } from './MediaModalCloseButton';
import { MediaModalDetails } from './MediaModalDetails';
import { MediaModalImage } from './MediaModalImage';

export const MediaModal = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const media = useMediaModalStore((state) => state.media);
  const openModal = useMediaModalStore((state) => state.openModal);
  const setOpenModal = useMediaModalStore((state) => state.setOpenModal);

  const { title = '', imagePath = '' } = media ?? {};

  const closeModal = () => {
    setOpenModal(false);
  };

  if (!sm) {
    // show drower in mobile
    return (
      <Drawer open={openModal} onOpenChange={(open: boolean) => !open && closeModal()}>
        <DrawerContent>
          <DrawerClose asChild>
            <MediaModalCloseButton closeModal={closeModal} />
          </DrawerClose>
          <MediaModalImage imagePath={imagePath} title={title} />
          <MediaModalDetails data={media as MediaCardType} isMobile={Boolean(sm)} />
        </DrawerContent>
      </Drawer>
    );
  }

  // show dialog in desktop
  return (
    <Dialog open={openModal} onOpenChange={(open: boolean) => !open && closeModal()}>
      <DialogContent
        className={cn(
          'bottom-0 top-[unset] mt-5 flex aspect-[0.9] h-[min-content] max-h-dvh max-w-[unset] translate-y-0 flex-col gap-0 rounded-t-md p-0 sm:top-[50%] sm:w-[90%] sm:max-w-[50rem] sm:translate-y-[-50%] sm:rounded-md'
        )}
      >
        <DialogClose asChild>
          <MediaModalCloseButton closeModal={closeModal} />
        </DialogClose>
        <MediaModalImage imagePath={imagePath} title={title} />
        <MediaModalDetails data={media as MediaCardType} isMobile={Boolean(sm)} />
      </DialogContent>
    </Dialog>
  );
};
